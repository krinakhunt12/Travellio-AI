import hotelApi from "../services/hotelApiService.js";
import unsplash from "../services/unsplashService.js";
import { enrichHotelsLLM } from "../services/llmService.js";

export async function hotelAgent(city) {
  // 1. fetch hotels using FREE API
  const hotels = await hotelApi.searchHotels(city);

  // 2. add images from Unsplash
  const withPhotos = await Promise.all(
    hotels.map(async h => {
      const photo = await unsplash.getPhoto(`${h.name} hotel ${city}`);
      return { ...h, photo };
    })
  );

  // 3. enrich with AI
  const enriched = await enrichHotelsLLM(withPhotos);

  // 4. group by price category
  const grouped = {
    budget: enriched.filter(h => h.priceCategory === "budget"),
    mid: enriched.filter(h => h.priceCategory === "mid"),
    luxury: enriched.filter(h => h.priceCategory === "luxury")
  };

  return { city, count: enriched.length, grouped, results: enriched };
}
