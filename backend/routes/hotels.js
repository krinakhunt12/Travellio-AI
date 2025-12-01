import express from 'express';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const router = express.Router();
// Some service modules were converted to CommonJS for Node compatibility — require them here
const travelpayouts = require('../services/travelpayouts.cjs');
const serpapi = require('../services/serpapi.cjs');
const llm = require('../services/llm.cjs');
import cache from '../utils/cache.js';

// Helper: bucket price INR to category
function bucketPrice(priceINR) {
  const p = Number(priceINR) || 0;
  // Use clearer bands: low (<3000), mid (3000-8000), high (>=8000)
  if (p < 3000) return 'budget';
  if (p >= 3000 && p < 8000) return 'mid';
  if (p >= 8000) return 'luxury';
  return 'other';
}

// GET /api/hotels?city=Bali&checkin=2025-12-10&nights=3&currency=INR
router.get('/', async (req, res) => {
  try {
    const { city, checkin, nights = 1, currency = 'INR' } = req.query;
    if (!city) return res.status(400).json({ error: 'city query required' });

    const cacheKey = `hotels:${city}:${checkin}:${nights}:${currency}`;
    const cached = cache.get(cacheKey);
    if (cached) return res.json(cached);

    // Primary fetch: TravelPayouts
    let hotels = await travelpayouts.searchHotels({ city, checkin, nights, currency });

    // Fallback: SerpAPI if no hotels found or low count
    if ((!hotels || hotels.length < 3) && process.env.SERPAPI_KEY) {
      const serpHotels = await serpapi.searchHotels({ city, checkin, nights, currency });
      hotels = (hotels || []).concat(serpHotels);
    }

    // Normalize and enrich
    // Map to { id, name, price, currency, priceINR, category, booking_link, location, raw }
    const normalized = hotels.map(h => {
      const price = h.price || h.price_per_night || h.min_price || 0;
      const currencyFromApi = h.currency || currency || 'INR';
      const priceINR = travelpayouts.convertToINR(price, currencyFromApi);
      const category = bucketPrice(priceINR);
      return {
        id: h.id || h.hotel_id || `${h.name}-${Math.random().toString(36).slice(2,8)}`,
        name: h.name,
        price: price,
        currency: currencyFromApi,
        priceINR,
        category,
        booking_link: h.booking_url || h.url || h.booking_link || null,
        location: h.location || null,
        raw: h
      };
    });

    // Call LLM to expand each hotel's description (batched)
    // Prepare prompt for LLM
    const toEnrich = normalized.slice(0, 12); // limit to 12 per request to keep LLM cost small
    const promptItems = toEnrich.map(h => ({
      name: h.name,
      priceINR: h.priceINR,
      category: h.category,
      raw: h.raw
    }));

    const enrichments = await llm.enrichHotels(promptItems);

    const merged = toEnrich.map((h, i) => ({
      ...h,
      enriched: enrichments[i] || {}
    }));

    // Deduplicate by normalized name + rounded location
    const seen = new Set();
    const deduped = [];
    for (const h of merged) {
      const nameKey = (h.name || '').toLowerCase().replace(/\s+/g, ' ').trim();
      const lat = h.location?.lat ? Number(h.location.lat).toFixed(4) : '0';
      const lon = h.location?.lon ? Number(h.location.lon).toFixed(4) : '0';
      const key = `${nameKey}::${lat}::${lon}`;
      if (seen.has(key)) continue;
      seen.add(key);
      deduped.push(h);
    }

    // scoring heuristic: higher is better — produce mostly positive scores
    function scoreHotel(h) {
      const amenities = (h.enriched?.amenities || '').split(',').filter(Boolean).length;
      const stars = Number(h.raw?.tags?.stars) || 0;
      const dist = Number(h.dist || h.raw?.dist || 0) || 0;
      const price = Number(h.priceINR || h.price || 0) || 0;
      // Components
      const amenityScore = amenities * 120; // each amenity worth 120
      const starScore = stars * 600; // each star worth 600
      const pricePenalty = (price / 1000) * 200; // larger price reduces score
      const distPenalty = (dist / 1000) * 50; // distance penalty
      const base = 1000; // baseline to keep scores positive
      const score = base + amenityScore + starScore - pricePenalty - distPenalty;
      return Math.round(score);
    }

    const scored = deduped.map(h => ({ ...h, score: scoreHotel(h) }));

    // group and sort by score (desc). For 'budget' prefer lower price then amenities
    const group = (arr, cat) => arr.filter(x => x.category === cat).sort((a, b) => {
      if (cat === 'budget') {
        // budget: prefer lower price, then higher score
        const p = (a.price - b.price);
        if (p !== 0) return p;
        return (b.score - a.score);
      }
      // mid/luxury: prefer higher score, tie-breaker lower price
      const s = (b.score - a.score);
      if (s !== 0) return s;
      return (a.price - b.price);
    });

    const byCategory = {
      budget: group(scored, 'budget').slice(0, 10),
      mid: group(scored, 'mid').slice(0, 10),
      luxury: group(scored, 'luxury').slice(0, 10),
      other: group(scored, 'other').slice(0, 10)
    };

    const response = {
      city,
      count: scored.length,
      results: scored,
      byCategory,
      // also return top overall hotels
      bestOverall: scored.slice().sort((a,b) => b.score - a.score).slice(0, 10)
    };

    // pick best single hotel per price range (low/mid/high) using tailored heuristics
    function pickBestForRange(arr, range) {
      if (!arr || arr.length === 0) return null;
      if (range === 'low') {
        // prioritize lowest price, then score
        return arr.slice().sort((a,b) => (a.price - b.price) || (b.score - a.score))[0];
      }
      if (range === 'mid') {
        // prioritize quality per price: score/price
        return arr.slice().sort((a,b) => ((b.score / (b.price||1)) - (a.score / (a.price||1))) || (b.score - a.score))[0];
      }
      // high: prefer highest score, then price
      return arr.slice().sort((a,b) => (b.score - a.score) || (b.price - a.price))[0];
    }

    response.bestPerRange = {
      low: pickBestForRange(byCategory.budget, 'low'),
      mid: pickBestForRange(byCategory.mid, 'mid'),
      high: pickBestForRange(byCategory.luxury, 'high')
    };

    cache.set(cacheKey, response);
    res.json(response);
  } catch (err) {
    console.error('Error /api/hotels', err);
    res.status(500).json({ error: err.message || 'internal error' });
  }
});

export default router;
