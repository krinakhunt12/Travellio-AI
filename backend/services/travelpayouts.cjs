const axios = require('axios');

const OTM_KEY = process.env.travelpayouts_API_KEY;
if (!OTM_KEY) console.warn("WARN: travelpayouts_API_KEY not set in .env");

const travelpayouts = {
  /**
   * Search hotels using travelpayouts FREE API
   * @param city - city name (will geocode first)
   * @param radius - default 5000m
   */
  async searchHotels({ city, radius = 5000 }) {
    try {
      // 1. Geocode city to lat/lon
      const geoUrl = `https://api.travelpayouts.com/0.1/en/places/geoname`;
      const geoResp = await axios.get(geoUrl, {
        params: {
          name: city,
          apikey: OTM_KEY
        }
      });

      if (!geoResp.data || !geoResp.data.lat) {
        console.warn("travelpayouts geocode failed");
        return [];
      }

      const { lat, lon } = geoResp.data;

      // 2. Get hotels within radius
      const hotelsUrl = `https://api.travelpayouts.com/0.1/en/places/radius`;

      const resp = await axios.get(hotelsUrl, {
        params: {
          lat,
          lon,
          radius,
          kinds: "other_hotels,lodging,apartments,hostels",
          format: "json",
          apikey: OTM_KEY
        }
      });

      const data = resp.data || [];

      return data.map((h) => ({
        id: h.xid,
        name: h.name,
        dist: h.dist,
        price: null, // OTM does NOT give price → AI will enrich later
        currency: "INR",
        price_per_night: null,
        booking_url: null, // no booking link in OTM
        location: {
          lat: h.point?.lat,
          lon: h.point?.lon
        },
        raw: h
      }));
    } catch (err) {
      console.warn("travelpayouts error:", err?.message);
      return [];
    }
  },

  // INR conversion stays same (for when you later add price API)
  convertToINR(amount, currency) {
    const a = Number(amount) || 0;
    if (!currency || currency.toUpperCase() === "INR") return a;
    const rates = { USD: 83, EUR: 90, IDR: 0.005 };
    const rate = rates[currency.toUpperCase()] || 1;
    return Math.round(a * rate);
  }
};

module.exports = travelpayouts;
