import axios from "axios";

export async function enrichHotelsLLM(hotels) {
  const prompt = `
For each hotel, return JSON with:

- priceCategory: budget / mid / luxury
- approxPriceINR
- amenities
- bestFor
- nightlife
- familyFriendly

Hotels: ${JSON.stringify(hotels)}
  `;

  try {
    const resp = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }
    );

    const text =
      resp.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "[]";

    let parsed = [];
    try {
      parsed = JSON.parse(text); // if valid json
    } catch {
      // try to extract JSON array/object from text (common assistant formatting)
      try {
        const jsonMatch = text.match(/\{?[\s\S]*\[.*\][\s\S]*\}?/m) || text.match(/\{[\s\S]*\}/m);
        if (jsonMatch) {
          parsed = JSON.parse(jsonMatch[0]);
        } else {
          console.warn("Gemini JSON parse failed, attempting simple fallback.");
          parsed = hotels.map(() => ({ priceCategory: "mid", approxPriceINR: 4500 }));
        }
      } catch (e) {
        console.warn("Gemini JSON extract failed, using basic fallback.");
        parsed = hotels.map(() => ({ priceCategory: "mid", approxPriceINR: 4500 }));
      }
    }

    // merge enriched hotel result
    return hotels.map((h, i) => ({
      ...h,
      ...(parsed[i] || {})
    }));
  } catch (err) {
    console.error("Gemini API Error:", err.response?.data || err.message);

    // fallback if Gemini fails
    return hotels.map(() => ({
      priceCategory: "mid",
      approxPriceINR: 4500
    }));
  }
}
