const axios = require('axios');

// Use free services: Nominatim for geocoding and Overpass API for POI (hotels)
// No API key required. This keeps the backend fully free to run.
const travelpayouts = {
  /**
   * Search hotels using travelpayouts FREE API
   * @param city - city name (will geocode first)
   * @param radius - default 5000m
   */
  async searchHotels({ city, radius = 5000 }) {
    try {
      // 1. Geocode city name using Nominatim (OpenStreetMap) - free/no-key
      const geoUrl = 'https://nominatim.openstreetmap.org/search';
      const geoResp = await axios.get(geoUrl, {
        params: { q: city, format: 'json', limit: 1 },
        headers: { 'User-Agent': 'Travellio-AI/1.0 (your-email@example.com)' }
      });

      const place = Array.isArray(geoResp.data) && geoResp.data[0];
      if (!place) {
        console.warn('travelpayouts geocode failed for', city);
        return [];
      }

      const lat = Number(place.lat);
      const lon = Number(place.lon);

      // 2. Query Overpass API for nearby hotels/guest houses/hostels/apartments (no key)
      const overpassUrl = 'https://overpass-api.de/api/interpreter';
      const kinds = ['tourism=hotel', 'tourism=guest_house', 'tourism=hostel', 'tourism=apartment', 'tourism=motel'];
      const q = `[
out:json][timeout:25];(
  node["tourism"~"hotel|guest_house|hostel|apartment|motel"](around:${radius},${lat},${lon});
  way["tourism"~"hotel|guest_house|hostel|apartment|motel"](around:${radius},${lat},${lon});
  relation["tourism"~"hotel|guest_house|hostel|apartment|motel"](around:${radius},${lat},${lon});
);
out center 50;`;

      const resp = await axios.post(overpassUrl, q, {
        headers: { 'Content-Type': 'text/plain' }
      });

      const elements = resp.data?.elements || [];

      // helper: compute distance in meters
      function haversine(lat1, lon1, lat2, lon2) {
        function toRad(x) { return x * Math.PI / 180; }
        const R = 6371000; // meters
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
      }

      function estimatePrice(tags, distMeters) {
        // Base INR price
        let price = 1500; // default mid-range
        // Stars heuristic
        if (tags && tags.stars) {
          const s = Number(tags.stars) || 0;
          if (s >= 5) price = 15000;
          else if (s === 4) price = 7000;
          else if (s === 3) price = 3500;
          else if (s === 2) price = 2000;
          else price = 1200;
        }

        // Brand heuristic (common premium brands)
        const brand = (tags.brand || '').toLowerCase();
        if (/marriott|hilton|hyatt|sheraton|ritz|four seasons|novotel|pullman|radisson/.test(brand)) {
          price = Math.max(price, 12000);
        }

        // Amenity adjustments
        if (tags.pool) price += 1500;
        if (tags.restaurant) price += 800;
        if (tags.breakfast) price += 500;

        // Distance heuristic: closer to center -> slightly higher
        if (distMeters != null) {
          if (distMeters <= 500) price += 1200;
          else if (distMeters <= 1500) price += 400;
          else if (distMeters > 5000) price = Math.round(price * 0.8);
        }

        // Clamp
        if (price < 500) price = 500;
        return Math.round(price);
      }

      return elements.map((el) => {
        const tags = el.tags || {};
        const latH = el.lat || (el.center && el.center.lat) || null;
        const lonH = el.lon || (el.center && el.center.lon) || null;
        const dist = latH && lonH ? Math.round(haversine(lat, lon, latH, lonH)) : null;
        const estimated = estimatePrice(tags, dist);
        return {
          id: el.id,
          name: tags.name || tags['name:en'] || tags['brand'] || 'Unknown',
          dist,
          price: estimated,
          currency: 'INR',
          price_per_night: estimated,
          booking_url: null,
          location: { lat: latH, lon: lonH },
          raw: el
        };
      });
    } catch (err) {
      console.warn('travelpayouts error:', err?.message || err);
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
