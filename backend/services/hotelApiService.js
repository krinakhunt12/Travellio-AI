const axios = require("axios");

const hotelApi = {
  async searchHotels(city) {
    try {
      // Step 1: Get city coordinates using Nominatim (free geocoding)
      const geoUrl = 'https://nominatim.openstreetmap.org/search';
      const geoResp = await axios.get(geoUrl, {
        params: { q: city, format: 'json', limit: 1 },
        headers: { 'User-Agent': 'TravelPlanner/1.0' }
      });

      if (!geoResp.data || geoResp.data.length === 0) {
        console.log(`No geocoding results for ${city}`);
        return [];
      }

      const { lat, lon } = geoResp.data[0];
      
      // Step 2: Search for hotels using Overpass API (OpenStreetMap data - free)
      const overpassUrl = 'https://overpass-api.de/api/interpreter';
      const query = `
        [out:json][timeout:25];
        (
          node["tourism"="hotel"](around:15000,${lat},${lon});
          way["tourism"="hotel"](around:15000,${lat},${lon});
          node["tourism"="guest_house"](around:15000,${lat},${lon});
        );
        out body 50;
      `;

      const overpassResp = await axios.post(overpassUrl, `data=${encodeURIComponent(query)}`, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      const elements = overpassResp.data.elements || [];
      
      return elements.map((h, idx) => ({
        id: h.id || `hotel-${idx}`,
        name: h.tags?.name || `Hotel ${idx + 1}`,
        address: h.tags?.['addr:street'] || h.tags?.['addr:city'] || city,
        price: estimatePrice(h.tags),
        currency: "INR",
        rating: h.tags?.stars ? parseFloat(h.tags.stars) : null,
        latitude: h.lat,
        longitude: h.lon,
        amenities: extractAmenities(h.tags),
        raw: h
      }));
    } catch (err) {
      console.log("Hotel search error:", err.message);
      return [];
    }
  }
};

function estimatePrice(tags) {
  // Estimate price based on stars and tags
  const stars = tags?.stars ? parseInt(tags.stars) : 3;
  if (stars >= 5) return 8000 + Math.random() * 7000; // Luxury
  if (stars >= 4) return 4000 + Math.random() * 4000; // Mid-range
  return 1500 + Math.random() * 2500; // Budget
}

function extractAmenities(tags) {
  const amenities = [];
  if (tags?.wifi === 'yes' || tags?.['internet_access'] === 'wlan') amenities.push('WiFi');
  if (tags?.swimming_pool === 'yes') amenities.push('Pool');
  if (tags?.restaurant === 'yes') amenities.push('Restaurant');
  if (tags?.parking === 'yes') amenities.push('Parking');
  if (tags?.air_conditioning === 'yes') amenities.push('AC');
  return amenities;
}

module.exports = hotelApi;
