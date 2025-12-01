const axios = require('axios');
const SERPAPI_KEY = process.env.SERPAPI_KEY;

const serpapi = {
  async searchHotels({ city, checkin, nights = 1, currency = 'INR' }) {
    if (!SERPAPI_KEY) return [];
    try {
      // SerpAPI "hotels" search example (Google Hotels results scraping)
      const url = `https://serpapi.com/search.json`;
      const resp = await axios.get(url, {
        params: {
          engine: 'google_hotels',
          q: `hotels in ${city}`,
          api_key: SERPAPI_KEY
        },
        timeout: 10000
      });

      const hotels = resp.data?.hotels_results || resp.data?.local_results || [];
      return hotels.map(h => ({
        id: h.place_id || h.id,
        name: h.title || h.name,
        price: h.price || h.price_level || null,
        currency: currency,
        booking_url: h.link || h.url,
        location: h.location,
        raw: h
      }));
    } catch (err) {
      console.warn('SerpAPI error', err?.message || err);
      return [];
    }
  }
};

module.exports = serpapi;