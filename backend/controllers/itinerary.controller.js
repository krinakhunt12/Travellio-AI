const { generateItinerary } = require("../services/itinerary.service");

async function itineraryController(req, res) {
  try {
    const attractions = req.body.attractions;

    if (!attractions || !Array.isArray(attractions))
      return res.status(400).json({ error: "Attractions list missing" });

    const itinerary = await generateItinerary(attractions);

    res.json({ success: true, itinerary });
  } catch (err) {
    console.error("Itinerary Agent Error:", err);
    res.status(500).json({ error: "Failed to generate itinerary" });
  }
}

module.exports = { itineraryController };
