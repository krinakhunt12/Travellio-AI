import { hotelAgent } from "../agents/hotelAgent.js";
import cache from "../utils/cache.js";

export async function fetchHotels(req, res) {
  try {
    const { city } = req.query;

    if (!city) return res.status(400).json({ error: "City is required" });

    const cacheKey = `hotel:${city}`;
    const cached = cache.get(cacheKey);
    if (cached) return res.json(cached);

    const data = await hotelAgent(city);

    cache.set(cacheKey, data);
    res.json(data);
  } catch (err) {
    console.error("Hotel Agent Error:", err);
    res.status(500).json({ error: err.message });
  }
}
