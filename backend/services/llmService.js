import axios from "axios";

export async function enrichHotelsLLM(hotels) {
  const prompt = `
For each hotel, return JSON array with objects containing:
- priceCategory: "budget" | "mid" | "luxury"
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
          { parts: [{ text: prompt }] }
        ]
      }
    );

    const text = resp.data?.candidates?.[0]?.content?.parts?.[0]?.text || "[]";

    let parsed = [];
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = hotels.map(() => ({
        priceCategory: "mid",
        approxPriceINR: 4500
      }));
    }

    return hotels.map((h, i) => ({
      ...h,
      ...(parsed[i] || {})
    }));
  } catch (err) {
    console.log("Gemini Error:", err.response?.data || err);
    return hotels.map(() => ({
      priceCategory: "mid",
      approxPriceINR: 4500
    }));
  }
}
