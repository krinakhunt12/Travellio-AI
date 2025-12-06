// services/flightService.js
const axios = require("axios");
const { API_KEYS, API_URLS } = require("../config/apiConfig.js");

async function getFlightEstimate(from, to, departDate) {
  try {
    const res = await axios.get(API_URLS.FLIGHT_SEARCH, {
      params: {
        origin: from,
        destination: to,
        depart_date: departDate,
        token: API_KEYS.TRAVELPAYOUTS,
      },
    });

    const price = res.data?.data?.[0]?.price || 18000; // fallback
    return price;
  } catch (err) {
    console.error("Flight API Error:", err.message);
    return 18000; // fallback estimate
  }
}

module.exports = { getFlightEstimate };
