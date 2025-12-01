const axios = require('axios');

const OPENAI_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_KEY) console.warn('WARN: OPENAI_API_KEY not set in env');

async function callOpenAI(prompt, maxTokens = 300) {
  const url = 'https://api.openai.com/v1/chat/completions';
  const resp = await axios.post(
    url,
    {
      model: 'gpt-4o-mini',
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
  const items = hotels.map(h => {
    return `Hotel: ${h.name}\nPrice (INR): ${h.priceINR}\nCategory: ${h.category}\nRaw: ${JSON.stringify(h.raw).slice(0, 600)}\n---\n`;
  }).join('\n');

  return `For each hotel in the list, return a JSON array of objects with fields:\n- amenities: short comma-separated list\n- short_description: 18-30 words describing who it's best for\n- nightlife: 1 sentence about nearby nightlife/community\n- family_friendly: "Yes" or "No" with 6-10 words reasoning\nReturn only valid JSON (array) in the same order as input.\n\nInput:\n${items}`;
}

const llm = {
  async enrichHotels(hotels) {
    try {
      const prompt = buildPromptForHotels(hotels);
      const data = await callOpenAI(prompt, 600);
      const text = data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text || '';
      try {
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) return parsed;
      } catch (err) {
        const jsonMatch = text.match(/\[.*\]/s);
        if (jsonMatch) {
          try {
            return JSON.parse(jsonMatch[0]);
          } catch (e) {
            console.warn('LLM returned unparsable JSON', e);
          }
        }
      }
      return hotels.map(() => ({}));
    } catch (err) {
      console.warn('LLM enrich error', err?.message || err);
      return hotels.map(() => ({}));
    }
  }
};

module.exports = llm;
