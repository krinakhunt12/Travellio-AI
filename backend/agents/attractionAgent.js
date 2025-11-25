// ================================
// ATTRACTION FINDER AGENT — FINAL OPTIMIZED VERSION
// Geoapify (Single API Call) + Unsplash + Gemini (Batch Mode)
// ================================

import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ---------------------------------------
// ENV VARIABLES
// ---------------------------------------
const GEOAPIFY_KEY = process.env.GEOAPIFY_KEY;
const UNSPLASH_KEY = process.env.UNSPLASH_KEY;
const GEMINI_KEY = process.env.GEMINI_API_KEY;

// ---------------------------------------
// Gemini Init
// ---------------------------------------
const genAI = new GoogleGenerativeAI(GEMINI_KEY);

// ===============================================================
// STEP 1 — Convert City → Coordinates (Generic, No Aliases)
// ===============================================================
async function getCoordinates(city) {
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
    city
  )}&format=json&apiKey=${GEOAPIFY_KEY}`;

  console.log("🌍 Geocode URL:", url.replace(/apiKey=.*/, "apiKey=REDACTED"));

  const res = await axios.get(url);

  if (!res.data.results?.length) throw new Error("City not found");

  // Choose best city-like match
  const best =
    res.data.results.find((r) => r.city) ||
    res.data.results.find((r) => r.county) ||
    res.data.results[0];

  return { lat: best.lat, lon: best.lon };
}

// ===============================================================
// STEP 2 — ONE Geoapify Call (Attractions + Food + Beaches + Nature)
// ===============================================================
async function getPlaces(lat, lon) {
 const categories = [
  "tourism.attraction",
  "tourism.sights",
  "natural",
  "beach",
  "catering.restaurant",
  "catering.cafe",
  "catering.bar",
  "catering.pub",
  "commercial.shopping_mall",
  "commercial.marketplace"
];


  const url = `https://api.geoapify.com/v2/places?categories=${categories.join(
    ","
  )}&filter=circle:${lon},${lat},6000&limit=30&apiKey=${GEOAPIFY_KEY}`;

  console.log("📍 Geoapify Places Request:", url.replace(/apiKey=.*/, "apiKey=REDACTED"));

  try {
    const res = await axios.get(url);
    return res.data.features || [];
  } catch (err) {
    console.log("❌ Geoapify error:", err.response?.status, err.response?.data);
    return [];
  }
}

// ===============================================================
// STEP 3 — Unsplash Image for Each Place
// ===============================================================
async function getImage(query) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    query
  )}&per_page=1&client_id=${UNSPLASH_KEY}`;

  try {
    const res = await axios.get(url);
    return res.data.results?.[0]?.urls?.small || null;
  } catch (err) {
    console.log("⚠️ Unsplash error:", err.response?.status);
    return null;
  }
}

// ===============================================================
// STEP 4 — Gemini Batch Enrichment (1 Single AI Call)
// ===============================================================
async function enrichBatchWithGemini(rawPlaces) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro-latest" });

  const prompt = `
You are a world-class travel expert.
Enrich the following places with detailed tourist information:

${JSON.stringify(rawPlaces, null, 2)}

For EACH place, return a JSON array item:
{
  "name": "",
  "description": "60–80 words",
  "why_famous": "Reason it is known",
  "visit_duration": "1-2 hours / half day",
  "best_time_to_visit": "Morning / Evening with reason",
  "local_tips": "3 practical bullet points"
}

Return ONLY valid JSON array. No commentary.
  `;

  try {
    const result = await model.generateContent(prompt);
    let text = result.response.text();
    
    // Strip markdown code fences if present
    text = text.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
    
    return JSON.parse(text);
  } catch (err) {
    console.log("❌ Gemini batch error:", err.message);
    return []; // fallback
  }
}

// ===============================================================
// MASTER AGENT — FINAL VERSION
// ===============================================================
export async function AttractionFinderAgent(city) {
  console.log("➡️ Step 1: Fetching coordinates...");
  const { lat, lon } = await getCoordinates(city);

  console.log("➡️ Step 2: Fetching places...");
  const geoPlaces = await getPlaces(lat, lon);

  if (!geoPlaces.length) {
    return {
      city,
      total: 0,
      attractions: [],
    };
  }

  // Prepare clean data for Gemini enrichment
  const rawPlaces = geoPlaces.map((p) => ({
    name: p.properties.name || "Unknown place",
    category: p.properties.categories?.[0] || "attraction",
    lat: p.geometry.coordinates[1],
    lon: p.geometry.coordinates[0],
  }));

  console.log("➡️ Step 3: Enriching with Gemini...");
  const enrichedList = await enrichBatchWithGemini(rawPlaces);

  console.log("➡️ Step 4: Loading images...");
  const final = [];

  for (let p of rawPlaces) {
    const enriched = enrichedList.find((e) => e.name === p.name) || {};
    const image = await getImage(p.name);

    final.push({
      ...p,
      image,
      ...enriched,
    });
  }

  return {
    city,
    total: final.length,
    attractions: final,
  };
}
