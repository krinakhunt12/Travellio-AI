const express = require("express");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();
const router = express.Router();

// 🟢 Log API Key Status
console.log("Gemini Key Loaded:", process.env.GEMINI_API_KEY ? "YES" : "NO");

// 🟢 Load Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Use LATEST + STRONGEST MODEL
const model = genAI.getGenerativeModel({
  model: "gemini-pro-latest",
});

router.post("/generate", async (req, res) => {
  try {
    const {
      departureCity,
      destination,
      travelDates,
      travellers,
      budget,
      interests,
      comfort,
    } = req.body;

    // ---------------------------------------------------------
    // 🔥 ADVANCED INTELLIGENT PROMPT — BEST VERSION
    // ---------------------------------------------------------
    const prompt = `
You are a WORLD-CLASS TRAVEL PLANNING AI AGENT.

You MUST produce the MOST DETAILED travel plan possible.
If the user only gives interests like "beach" or "nature", automatically SUGGEST suitable destinations before planning.

Your output must be COMPLETE, covering:

==================================================
🟣 1) DESTINATION DISCOVERY
- Recommend best destinations worldwide matching interests.
- If user already gave a destination, still show similar nearby cities.

🟣 2) TRIP SUMMARY
- Where traveler is going
- Why this destination is best
- Ideal trip duration
- Total expected cost (highly accurate)

🟣 3) BEST TIME TO VISIT + WEATHER (month-wise)

🟣 4) TRAVEL ROUTE (FLIGHT + TRAIN)
- Cheapest flights
- Average round-trip cost
- Train routes (if applicable)
- Travel time
- Airports + stations

🟣 5) DAY-WISE ITINERARY (SUPER DETAILED)
For EVERY day:
- Morning plan
- Afternoon plan
- Evening plan
Every activity must include:
  • Category: nature / beach / museum / landmark / food / adventure  
  • Short 2–3 line description  
  • Duration  
  • Ticket price  
  • Opening–closing timings  
  • Distance & travel time from hotel  
  • Why visit this place  

🟣 6) ATTRACTIONS LIST (TOP 20+)
For each attraction:
- Famous places AND hidden gems
- Category
- Ticket cost
- Timings
- Best time to visit
- How crowded it gets
- Google rating
- Local tips

🟣 7) HOTEL RECOMMENDATION (Budget, Mid-range, Luxury)
For each hotel:
- Name  
- Location + why this area is good  
- Approx price per night  
- Rating band  
- Distance to main attractions  
- 2–3 hotel options per budget  
- Booking link (Booking.com or Agoda)

🟣 8) FOOD GUIDE
- Local must-try dishes
- Vegetarian & Indian-friendly options
- Street food areas
- Cafes to visit
- Average food cost per day
- 5–8 restaurant recommendations

🟣 9) LOCAL TRANSPORT BREAKDOWN
- Metro / bus / taxi cost
- Bike/scooter rentals
- Daily average cost

🟣 10) POCKET MONEY GUIDE
- Shopping estimate
- Extra expenses
- Ideal emergency amount

🟣 11) TOTAL COST BREAKDOWN (SUPER ACCURATE)
- Hotel x nights
- Flight cost
- Food total
- Local travel total
- Tickets total
- Pocket money
- FINAL GRAND TOTAL

🟣 12) SAFETY TIPS
- Avoid scams
- Local rules
- Women safety rating

🟣 13) PACKING LIST
- Clothes
- Medicines
- Power adapters
- Essentials based on weather

==================================================

NOW USE THE FOLLOWING USER DATA TO GENERATE THE PLAN:

Departure City: ${departureCity}
Destination: ${destination}
Travel Dates: ${travelDates}
Travellers: ${travellers}
Total Budget: ${budget}
Interests: ${interests?.join(", ")}
Comfort Level: ${comfort}

==================================================

RESPONSE FORMAT STRICT JSON (NO TEXT OUTSIDE JSON):

{
 "destination_discovery": [],
 "trip_summary": "",
 "best_time": "",
 "weather": "",
 "flights_trains": {},
 "daywise_itinerary": [],
 "attractions": [],
 "hotels": {
   "budget": [],
   "mid": [],
   "luxury": []
 },
 "food_guide": {
   "must_try": [],
   "restaurants": []
 },
 "local_transport": {},
 "pocket_money": "",
 "total_cost": {},
 "safety_tips": "",
 "packing_list": []
}
    `;

    // ---------------------------------------------------------
    // 🔥 CALL GEMINI
    // ---------------------------------------------------------
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Sanitize JSON
    let cleaned = text.trim()
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .replace(/[\u0000-\u001F]+/g, "");

    const finalJSON = JSON.parse(cleaned);
    res.json(finalJSON);

  } catch (err) {
    console.error("🔥 Error:", err);
    res.status(500).json({
      error: "AI Agent Failed",
      details: err.message,
    });
  }
});

module.exports = router;
