// routes/masterRoute.js
const express = require("express");
const { masterTravelAgent } = require("../agents/masterAgent.js");

const router = express.Router();

/**
 * POST /api/master/plan
 * 
 * Master orchestrator endpoint - coordinates all 5 agents
 * 
 * Request body:
 * {
 *   "departureCity": "Mumbai",
 *   "destination": "Goa, India",
 *   "travelDates": "7 days",
 *   "travellers": 2,
 *   "budget": 50000,
 *   "interests": ["nature", "beach", "food"],
 *   "comfort": "mid"
 * }
 */
router.post("/plan", masterTravelAgent);

module.exports = router;
