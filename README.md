# Travellio-AI (Travel Planner)

A small travel planning project that finds attractions, food, shopping and enriches them with AI-powered descriptions. Uses Geoapify (places + geocoding), Unsplash (images), and Gemini (Google Generative AI) for enrichment.

---

**Repo layout**

- `backend/` — Express server and agents
  - `agents/` — attraction and city analysis agents
  - `routes/` — API routes
  - `server.js` — entry point (listens on port 5000)
- `Frontend/` — Vite + React frontend
- `.env` — local environment variables (NOT committed)
- `.gitignore` — ignores `node_modules/`, `.env`, and other files

---

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Geoapify account + API key
- Unsplash developer key (optional; images will gracefully fallback if restricted)
- Google Generative AI (Gemini) API key

---

## Environment variables

Create a `.env` file in the project root (not committed). Required variables used by the backend:

```
GEOAPIFY_KEY=your_geoapify_key
UNSPLASH_KEY=your_unsplash_key
GEMINI_API_KEY=your_gemini_api_key
PORT=5000        # optional
```

Security note: Do NOT commit `.env` or any API keys. The repo already contains `.gitignore` entries for `.env` and `node_modules/`.

---

## Install dependencies

Install backend dependencies:

```powershell
cd "D:\Aksa main\Krina\Travel Planner\backend"
npm install
```

Install frontend dependencies:

```powershell
cd "D:\Aksa main\Krina\Travel Planner\Frontend"
npm install
```

---

## Running

Start the backend (development):

```powershell
cd "Path\Travel Planner\backend"
node server.js
```

Start the frontend (Vite):

```powershell
cd "Path\Travel Planner\Frontend"
npm run dev
```

The backend exposes routes used by the frontend. By default `server.js` prints a debug line confirming `GEMINI_API_KEY` is loaded and listens at `http://localhost:5000`.

### Example API endpoints

- `POST /api/travel` — travel planning route (see `routes/travelAgent.js`)
- `GET/POST /api/attractions` — attractions route (see `routes/attractionsRoute.js`)
- `POST /city-analysis` — city analysis agent

(Inspect the files in `backend/routes/` for exact payload shapes.)

---

## Troubleshooting

1. Geoapify 403 / 400 errors
   - 403 means forbidden: check API key validity, restrictions (referer/IP), account billing, and quotas.
   - 400 indicates bad request parameter (for example unsupported category). If you see messages like `Category "entertainment.nightclub" is not supported`, update categories to the supported list. The code has a consolidated `getPlaces` helper in `backend/agents/attractionAgent.js` — edit categories there if necessary.
   - Quick test for key validity (PowerShell):

```powershell
Invoke-RestMethod -Uri "https://api.geoapify.com/v1/geocode/search?text=Denpasar&apiKey=YOUR_KEY" -Method Get
```

   - Or simple Node test (`testGeo.js`) to capture status + body:

```javascript
// testGeo.js
const fetch = require('node-fetch');
(async ()=>{
  const res = await fetch('https://api.geoapify.com/v1/geocode/search?text=Denpasar&apiKey=YOUR_KEY');
  console.log(res.status);
  console.log(await res.text());
})();
```

2. Gemini (AI) parse errors
   - The agent expects the model to return strict JSON. If the model returns markdown fences or extra commentary (e.g. ```json ... ```), the code strips common fences before parsing. If you still get parse errors, inspect the raw AI output and tighten the prompt to require JSON-only responses.

3. Unsplash 403
   - Unsplash can return 403 if the key is invalid or rate limited. The agent now falls back to `null` images when Unsplash fails.

4. Git shows files in green (tracked) even though `.gitignore` has them
   - `.gitignore` prevents adding new untracked files, but does not remove already tracked files. To stop tracking files already committed (but keep them locally):

```powershell
# mark directory as safe if Git complains about ownership
git config --global --add safe.directory 'D:/Aksa main/Krina/Travel Planner'

# untrack node_modules and .env while keeping local copies
git rm -r --cached backend/node_modules
git rm --cached backend/.env
git rm -r --cached Frontend/node_modules
git rm --cached Frontend/.env

git commit -m "Remove node_modules and env files from tracking"
git push
```

5. Git "src refspec main does not match any" when pushing
   - Make an initial commit first:

```powershell
git add .
git commit -m "Initial commit: Travellio-AI"
git push -u origin main
```

If Git complains about dubious ownership use the `git config --global --add safe.directory 'D:/Aksa main/Krina/Travel Planner'` command first.

---

## Development notes & tips

- The backend logs Geoapify requests with the API key redacted for safety.
- If Geoapify returns parameter validation errors, check `backend/agents/attractionAgent.js` categories array and change to supported category strings shown in the error message.
- For Gemini, make the prompt minimal and strict about JSON output to avoid parse issues.

---

## Want me to help?

I can:
- Run quick diagnostic scripts to check each API key (Geoapify / Unsplash / Gemini) and show the raw responses.
- Add a `testGeo.js`/`testUnsplash.js` script to `backend/` that you can run locally.
- Create a small `.env.example` file (without secrets) to document required keys.

Tell me which of the above you'd like me to do next.
