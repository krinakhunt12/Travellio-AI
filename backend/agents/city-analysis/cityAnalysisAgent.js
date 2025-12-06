const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function askLLM(rawData) {
    const prompt = `
You are a travel expert. Convert the following API data into a clean JSON with:
- bestTimeToVisit
- weatherByMonth
- safetySummary
- localLaws
- scams
- etiquette
- plugType
- simCard
- transport
- visa

Return ONLY JSON.

API Data:
${JSON.stringify(rawData)}
`;

    // Try a sequence of models (some deployments may not be available in certain SDK versions)
    const candidateModels = [
        "gemini-pro-latest",
    ];

    let lastErr = null;
    for (const m of candidateModels) {
        try {
            const model = genAI.getGenerativeModel({ model: m });
            const result = await model.generateContent(prompt);
            const raw = await result.response.text();

            // Clean common wrappers (markdown fences, code blocks)
            let cleaned = raw.replace(/```\s*json\s*/gi, "").replace(/```/g, "").trim();

            // If still not valid JSON, attempt to extract the first { ... } or [ ... ] substring
            const tryParse = (txt) => {
                try {
                    return JSON.parse(txt);
                } catch (e) {
                    return null;
                }
            };

            let parsed = tryParse(cleaned);
            if (!parsed) {
                // attempt to find first JSON object or array by locating first { and last }
                const firstObjStart = cleaned.indexOf("{");
                const lastObjEnd = cleaned.lastIndexOf("}");
                if (firstObjStart !== -1 && lastObjEnd !== -1 && lastObjEnd > firstObjStart) {
                    const sub = cleaned.slice(firstObjStart, lastObjEnd + 1);
                    parsed = tryParse(sub);
                }
            }

            if (!parsed) {
                // Try array form
                const firstArrStart = cleaned.indexOf("[");
                const lastArrEnd = cleaned.lastIndexOf("]");
                if (firstArrStart !== -1 && lastArrEnd !== -1 && lastArrEnd > firstArrStart) {
                    const sub = cleaned.slice(firstArrStart, lastArrEnd + 1);
                    parsed = tryParse(sub);
                }
            }

            if (!parsed) {
                // give up for this model — include a snippet to help debugging
                const snippet = cleaned.slice(0, 1000);
                throw new Error(`Model ${m} returned non-JSON response (snippet: ${snippet.replace(/\s+/g, ' ')}...)`);
            }

            return parsed;
        } catch (err) {
            // If it's a 404 from the Gemini endpoint, try the next model; otherwise keep trying too but log
            console.warn(`askLLM: model ${m} failed:`, err && err.message ? err.message : err);
            // normalize lastErr to an Error with model context
            lastErr = (err instanceof Error) ? new Error(`model ${m} error: ${err.message}`) : new Error(String(err));
            // continue to next model
        }
    }

    // If we reach here, all model attempts failed — throw the last error so caller can decide fallback
    throw lastErr || new Error("No generative model available");
}

async function cityAnalysisAgent(req, res) {
    try {
        const { city, lat, lon, country } = req.body;

        // helper: fetch with retries + timeout + backoff
        const fetchWithRetries = async (url, opts = {}) => {
            const attempts = opts.attempts || 3;
            const timeout = opts.timeout || 8000; // ms
            const delay = opts.delay || 800; // ms base

            for (let i = 0; i < attempts; i++) {
                try {
                    const response = await axios.get(url, { timeout });
                    return response;
                } catch (err) {
                    const isLast = i === attempts - 1;
                    const msg = err && err.message ? err.message : String(err);
                    console.warn(`fetchWithRetries attempt ${i + 1}/${attempts} failed for ${url}: ${msg}`);
                    if (isLast) throw err;
                    // exponential-ish backoff
                    await new Promise((r) => setTimeout(r, delay * (i + 1)));
                }
            }
        };

        // 1) Weather API (with timeout)
        let weather = null;
        try {
            const w = await fetchWithRetries(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`,
                { attempts: 2, timeout: 7000 }
            );
            weather = w.data;
        } catch (err) {
            console.warn('Weather API failed:', err && err.message);
            weather = {};
        }

        // 2) Country Info
        let countryInfo = null;
        try {
            const c = await fetchWithRetries(`https://restcountries.com/v3.1/name/${country}?fullText=true`, { attempts: 2, timeout: 7000 });
            countryInfo = c.data;
        } catch (err) {
            console.warn('Country info API failed:', err && err.message);
            countryInfo = {};
        }

        // 3) Safety API (travelbriefing) — may be unreliable; use retries and fallback
        let advisory = null;
        try {
            const a = await fetchWithRetries(`https://travelbriefing.org/${country}?format=json`, { attempts: 3, timeout: 7000, delay: 1200 });
            advisory = a.data;
        } catch (err) {
            // Network issue/timeouts are possible; don't fail the whole route because of this
            console.warn('TravelBriefing advisory fetch failed (falling back to empty advisory):', err && err.message);
            advisory = {};
        }

        const rawData = {
            weather,
            countryInfo,
            safety: advisory,
        };

        // 🔥 Ask Gemini to clean + convert raw API data
        let formatted = null;
        try {
            formatted = await askLLM(rawData);
        } catch (err) {
            console.warn('askLLM failed; returning raw API data as fallback:', err && err.message);
            // Return rawData with a note that LLM formatting failed
            formatted = {
                _llm_error: err && err.message ? String(err.message) : 'LLM formatting failed',
                _raw: rawData,
            };
        }

        res.json(formatted);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = cityAnalysisAgent;
