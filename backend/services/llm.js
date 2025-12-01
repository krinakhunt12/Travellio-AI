const axios = require('axios');

const OPENAI_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_KEY) console.warn('WARN: OPENAI_API_KEY not set in env');

async function callOpenAI(prompt, maxTokens = 300) {
  // Using OpenAI Chat Completions v1 as example. If you have Gemini, replace endpoint & model.
  const url = 'https://api.openai.com/v1/chat/completions';
  const resp = await axios.post(
    url,
    {
      model: 'gpt-4o-mini', // replace with your model name or Gemini equivalent
      messages: [{ role: 'system', content: 'You are a travel assistant that writes concise hotel summaries.' }, { role: 'user', content: prompt }],
      temperature: 0.1,
      max_tokens: maxTokens
    },
    {
      headers: {
        Authorization: `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return resp.data;
}

function buildPromptForHotels(hotels) {
  // hotels: [{name, priceINR, category, raw}]
  const items = hotels.map(h => {
    return `Hotel: ${h.name}
Price (INR): ${h.priceINR}
Category: ${h.category}
Raw: ${JSON.stringify(h.raw).slice(0, 600)}
---
`;
  }).join('\n');

  return `For each hotel in the list, return a JSON array of objects with fields:
- amenities: short comma-separated list
- short_description: 18-30 words describing who it's best for
- nightlife: 1 sentence about nearby nightlife/community
- family_friendly: "Yes" or "No" with 6-10 words reasoning
Return only valid JSON (array) in the same order as input.

Input:
${items}`;
}

const llm = {
  async enrichHotels(hotels) {
    try {
      const prompt = buildPromptForHotels(hotels);
      const data = await callOpenAI(prompt, 600);
      const text = data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text || '';
      // Attempt parse JSON
      try {
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) return parsed;
      } catch (err) {
        // sometimes assistant outputs code fences or extra text — try to extract JSON blob
        const jsonMatch = text.match(/\[.*\]/s);
        if (jsonMatch) {
          try {
            return JSON.parse(jsonMatch[0]);
          } catch (e) {
            console.warn('LLM returned unparsable JSON', e);
          }
        }
      }
      // Fallback: return empty enrichments
      return hotels.map(() => ({}));
    } catch (err) {
      console.warn('LLM enrich error', err?.message || err);
      return hotels.map(() => ({}));
    }
  }
};

module.exports = llm;