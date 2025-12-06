const { getDistanceMatrix } = require("../agents/itinerary/ors.client");
const { optimizeRoute } = require("../utils/itinerary.utils");
const { FINAL_ITINERARY_PROMPT } = require("../agents/itinerary/itinerary.prompts");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GEMINI_API_KEY, MODEL } = require("../config/gemini.config");

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function generateItinerary(attractions) {
  // Step 1: Prepare coordinates list
  const coords = attractions.map((a) => [a.lon, a.lat]);

  // Step 2: Distance Matrix
  const matrix = await getDistanceMatrix(coords);

  // Step 3: Optimize route
  const order = optimizeRoute(attractions, matrix);

  const orderedAttractions = order.map((i) => attractions[i]);

  // Step 4: Build raw plan (Morning → Afternoon → Evening)
  const rawPlan = {
    day: 1,
    morning: orderedAttractions[0],
    afternoon: orderedAttractions[1],
    evening: orderedAttractions[2],
  };

  // Step 5: Gemini final formatting
  const model = genAI.getGenerativeModel({ model: MODEL });

  const result = await model.generateContent(
    FINAL_ITINERARY_PROMPT(rawPlan)
  );
  const responseText = await result.response.text();

  // Robust JSON extraction: strip markdown fences and control characters,
  // then extract the first JSON object/array block and parse it.
  let text = (responseText || '').toString();
  text = text.replace(/```\s*json/gi, '').replace(/```/g, '');
  // remove non-printable/control characters
  text = text.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');

  // find first JSON object or array
  const firstObj = text.indexOf('{');
  const lastObj = text.lastIndexOf('}');
  const firstArr = text.indexOf('[');
  const lastArr = text.lastIndexOf(']');

  let jsonStr = null;
  if (firstObj !== -1 && lastObj !== -1 && lastObj > firstObj) {
    jsonStr = text.slice(firstObj, lastObj + 1);
  } else if (firstArr !== -1 && lastArr !== -1 && lastArr > firstArr) {
    jsonStr = text.slice(firstArr, lastArr + 1);
  } else {
    // nothing looks like JSON — throw with snippet to aid debugging
    const snippet = text.slice(0, 1000);
    throw new Error('Itinerary LLM did not return JSON. Snippet: ' + snippet.replace(/\s+/g,' '));
  }

  try {
    return JSON.parse(jsonStr);
  } catch (err) {
    const snippet = jsonStr.slice(0, 1000);
    throw new Error('Failed to parse JSON from Itinerary LLM response: ' + (err.message || err) + '\nSnippet: ' + snippet.replace(/\s+/g,' '));
  }
}

module.exports = { generateItinerary };
