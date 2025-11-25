import express from "express";
import { AttractionFinderAgent } from "../agents/attractionAgent.js";

const router = express.Router();

router.post("", async (req, res) => {
  try {
    const { city } = req.body;

    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }

    const data = await AttractionFinderAgent(city);

    res.json({
      success: true,
      data
    });

  } catch (err) {
    console.error("Agent Error:", err.message);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

export default router;
