import axios from "axios";

const OTM_KEY = process.env.OPENTRIPMAP_API_KEY;

const opentripmap = {
  async searchHotels({ city, radius = 5000 }) {
    try {
      // Step 1: Geocode city
      const geo = await axios.get(
        `https://api.opentripmap.com/0.1/en/places/geoname`,
        {
          params: { name: city, apikey: OTM_KEY },
        }
      );

      const { lat, lon } = geo.data;

      // Step 2: Fetch hotels / lodging
      const resp = await axios.get(
        `https://api.opentripmap.com/0.1/en/places/radius`,
        {
          params: {
            lat,
            lon,
            radius,
            kinds: "other_hotels,lodging,apartments,hostels",
            format: "json",
            apikey: OTM_KEY,
          },
        }
      );

      return resp.data.map((h) => ({
        id: h.xid,
        name: h.name,
        distance: h.dist,
        location: h.point,
        price: null,
        photo: null,
        raw: h,
      }));
    } catch (err) {
      console.log("OTM error:", err.message);
      return [];
    }
  },
};

export default opentripmap;
