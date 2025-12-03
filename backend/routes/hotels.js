const express = require('express');
const router = express.Router();
const Joi = require('joi');
const dayjs = require('dayjs');
const travelpayouts = require('../services/travelpayouts');
const serpapi = require('../services/serpapi');
const llmService = require('../services/llmService');
const { logger } = require('../utils/logger');
const { deduplicateHotels } = require('../utils/deduplicate');
const { getCityCenter } = require('../utils/geo');

const searchSchema = Joi.object({
  destination: Joi.string().min(2).required(),
  checkIn: Joi.date().iso().required(),
  checkOut: Joi.date().iso().required(),
  adults: Joi.number().integer().min(1).default(2),
  rooms: Joi.number().integer().min(1).default(1)
});

function classifyPriceINR(price) {
  if (price >= 1500 && price <= 3000) return 'budget';
  if (price > 3000 && price <= 7000) return 'midRange';
  if (price >= 8000 && price <= 20000) return 'luxury';
  // fallback
  if (price < 1500) return 'budget';
  if (price > 20000) return 'luxury';
  return 'midRange';
}

router.get('/search', async (req, res, next) => {
  try {
    const { error, value } = searchSchema.validate(req.query, { convert: true });
    if (error) return res.status(400).json({ error: error.details.map(d => d.message).join(', ') });

    const { destination, checkIn, checkOut, adults, rooms } = value;

    if (!dayjs(checkOut).isAfter(dayjs(checkIn))) {
      return res.status(400).json({ error: 'checkOut must be after checkIn' });
    }

    logger.info(`Search hotels for ${destination} ${checkIn} -> ${checkOut}`);

    // 1) Try Travelpayouts
    let hotels = await travelpayouts.searchHotels({ destination, checkIn, checkOut, adults, rooms });

    // 2) Fallback to SerpAPI if insufficient
    if (!hotels || hotels.length < 4) {
      logger.warn('Travelpayouts returned few results; trying SerpAPI fallback');
      const serp = await serpapi.searchHotels({ destination, checkIn, checkOut, adults, rooms });
      hotels = (hotels || []).concat(serp || []);
    }

    // deduplicate
    hotels = deduplicateHotels(hotels);

    if (!hotels || hotels.length === 0) {
      return res.status(404).json({ error: 'No hotels found for this destination/dates' });
    }

    // attempt to get city center for distance calculation
    let cityCenter = null;
    try {
      cityCenter = await getCityCenter(destination);
    } catch (e) {
      logger.warn('Failed to get city center coordinates', e.message || e);
    }

    // Call LLM for each hotel to enrich data
    const enrichedPromises = hotels.map(async (h) => {
      // Build LLM input
      const llmInput = {
        city: destination,
        dates: { checkIn, checkOut },
        hotel: {
          name: h.name,
          address: h.address || '',
          rawAmenities: h.amenities || [],
          pricePerNight: h.pricePerNightINR,
          currency: 'INR',
          latitude: h.latitude,
          longitude: h.longitude
        },
        context: "Return short JSON: whyThisAreaIsGood, amenities (normalized list), bestFor (array), nightlifeAndCommunity (short), familyFriendly {isFamilyFriendly, reason}."
      };

      let llmOut = null;
      try {
        llmOut = await llmService.enrichHotel(llmInput);
      } catch (err) {
        logger.error('LLM enrich failed for hotel: ' + (h.name || 'unknown'), err.message || err);
        // fallback to safe defaults
        llmOut = {
          whyThisAreaIsGood: '',
          amenities: Array.isArray(h.amenities) ? h.amenities : [],
          bestFor: [],
          nightlifeAndCommunity: '',
          familyFriendly: { isFamilyFriendly: false, reason: '' }
        };
      }

      // build final object
      const final = {
        name: h.name,
        area: h.address || h.area || '',
        pricePerNightINR: h.pricePerNightINR || null,
        priceCategory: classifyPriceINR(h.pricePerNightINR || 0),
        bookingLink: h.bookingLink || h.url || '',
        distanceToMainAttractions: h.latitude && h.longitude && cityCenter
          ? `${(h.distanceToCenterKm || h.distanceToCenterKm) || (Math.round(h.distanceToCenterKm*10)/10 || 'approx unknown')} km — approx to city center`
          : (h.distanceToCenterKm ? `${h.distanceToCenterKm} km` : 'unknown'),
        whyThisAreaIsGood: llmOut.whyThisAreaIsGood,
        amenities: llmOut.amenities,
        bestFor: llmOut.bestFor,
        nightlifeAndCommunity: llmOut.nightlifeAndCommunity,
        familyFriendly: llmOut.familyFriendly
      };

      // If distance not provided but coords available and city center available, compute actual
      if (h.latitude && h.longitude && cityCenter) {
        const lat1 = parseFloat(h.latitude), lon1 = parseFloat(h.longitude);
        const lat2 = cityCenter.lat, lon2 = cityCenter.lon;
        // compute haversine
        function toRad(v){return v*Math.PI/180;}
        const R = 6371;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat/2)*Math.sin(dLat/2) + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)*Math.sin(dLon/2);
        const c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const km = R * c;
        final.distanceToMainAttractions = `${(Math.round(km*10)/10)} km — approx to city center`;
      }

      return final;
    });

    const enriched = await Promise.all(enrichedPromises);

    // group by category
    const grouped = { budget: [], midRange: [], luxury: [] };
    enriched.forEach(h => {
      if (h.priceCategory === 'budget') grouped.budget.push(h);
      else if (h.priceCategory === 'midRange') grouped.midRange.push(h);
      else if (h.priceCategory === 'luxury') grouped.luxury.push(h);
      else grouped.midRange.push(h);
    });

    res.json({
      destination,
      checkIn,
      checkOut,
      budget: grouped.budget,
      midRange: grouped.midRange,
      luxury: grouped.luxury
    });

  } catch (err) {
    next(err);
  }
});

module.exports = router;
