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
  if (p >= 1500 && p <= 3000) return 'budget';
  if (p > 3000 && p <= 7000) return 'mid';
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

    // group by category
    const byCategory = {
      budget: merged.filter(x => x.category === 'budget'),
      mid: merged.filter(x => x.category === 'mid'),
      luxury: merged.filter(x => x.category === 'luxury'),
      other: merged.filter(x => x.category === 'other')
    };

    const response = {
      city,
      count: merged.length,
      results: merged,
      byCategory
    };

    cache.set(cacheKey, response);
    res.json(response);
  } catch (err) {
    console.error('Error /api/hotels', err);
    res.status(500).json({ error: err.message || 'internal error' });
  }
});

export default router;
