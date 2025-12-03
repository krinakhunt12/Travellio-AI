import axios from "axios";
import travelpayouts from './travelpayouts.js';

const hotelApi = {
  async searchHotels(city) {
    try {
      const url = `https://hotelapi.dev/api/hotels`;

      const resp = await axios.get(url, {
        params: { city },
        timeout: 8000
      });

      if (!resp?.data || !Array.isArray(resp.data) || resp.data.length === 0) {
        // upstream returned nothing — fallback to travelpayouts Overpass implementation
        console.warn('HotelAPI returned no data, falling back to Overpass');
        return await travelpayouts.searchHotels({ city });
      }

      return resp.data.map(h => ({
        id: h.id || h.name,
        name: h.name,
        price: h.price || null,
        currency: h.currency || "USD",
        address: h.address,
        rating: h.rating || null,
        raw: h
      }));

    } catch (err) {
      console.log("HotelAPI Error:", err.message);
      // On network errors, fallback to Overpass-based search (travelpayouts)
      try {
        return await travelpayouts.searchHotels({ city });
      } catch (e) {
        console.error('Fallback travelpayouts failed:', e?.message || e);
        return [];
      }
    }
  }
};

export default hotelApi;
