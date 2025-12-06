import hotelApi from "../services/hotelApiService.js";
import unsplash from "../services/unsplashService.js";
import { enrichHotelsLLM } from "../services/llmService.js";

export async function hotelAgent(city) {
  // 1. Get hotels (FREE)
  const hotels = await hotelApi.searchHotels(city);

  // 2. Add photos
  const withPhotos = await Promise.all(
    hotels.map(async (h) => ({
      ...h,
      photo: await unsplash.getPhoto(`${h.name} hotel ${city}`)
    }))
  );

  // 3. Enrich using AI (Price category, amenities, etc.)
  const enriched = await enrichHotelsLLM(withPhotos);

  return {
    city,
    count: enriched.length,
    grouped: {
      budget: enriched.filter((h) => h.priceCategory === "budget"),
      mid: enriched.filter((h) => h.priceCategory === "mid"),
      luxury: enriched.filter((h) => h.priceCategory === "luxury")
    },
    results: enriched
  };
}
