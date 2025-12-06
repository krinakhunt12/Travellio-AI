// services/transportService.js
const axios = require("axios");
const { API_KEYS, API_URLS } = require("../config/apiConfig.js");

async function estimateLocalTransport(distanceKm) {
  try {
    const cost = distanceKm * 15; // ₹15 per km
    return cost;
  } catch (err) {
    return 2000; // fallback
  }
}

module.exports = { estimateLocalTransport };
