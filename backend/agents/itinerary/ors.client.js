const axios = require("axios");
const { ORS_API_KEY, ORS_BASE_URL } = require("../../config/ors.config");

async function getDistanceMatrix(coords) {
  try {
    const resp = await axios.post(
      ORS_BASE_URL,
      {
        locations: coords,
        metrics: ["duration", "distance"],
      },
      {
        headers: {
          Authorization: ORS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return resp.data;
  } catch (err) {
    console.error("ORS Error:", err.response?.data || err);
    throw new Error("Failed to fetch distance matrix from OpenRouteService");
  }
}

module.exports = { getDistanceMatrix };
