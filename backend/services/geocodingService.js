const axios = require("axios");

/**
 * Geocoding Service - Converts location names to coordinates
 * Uses Nominatim (OpenStreetMap) - free and no API key required
 */

const NOMINATIM_API = "https://nominatim.openstreetmap.org";

/**
 * Get coordinates and detailed info for a location
 * @param {string} location - City, state, or country name
 * @returns {Promise<Object>} Location data with lat, lon, country, etc.
 */
async function geocodeLocation(location) {
  try {
    // Nominatim requires a User-Agent header
    const response = await axios.get(`${NOMINATIM_API}/search`, {
      params: {
        q: location,
        format: "json",
        limit: 1,
        addressdetails: 1,
      },
      headers: {
        "User-Agent": "Travel-Planner-App/1.0",
      },
      timeout: 5000,
    });

    if (!response.data || response.data.length === 0) {
      throw new Error(`Location "${location}" not found`);
    }

    const data = response.data[0];
    const address = data.address || {};

    return {
      lat: parseFloat(data.lat),
      lon: parseFloat(data.lon),
      displayName: data.display_name,
      city: address.city || address.town || address.village || location,
      state: address.state || "",
      country: address.country || "",
      countryCode: address.country_code?.toUpperCase() || "",
    };
  } catch (error) {
    console.error(`Geocoding failed for "${location}":`, error.message);
    
    // Return fallback data instead of throwing
    return {
      lat: null,
      lon: null,
      displayName: location,
      city: location,
      state: "",
      country: location,
      countryCode: "",
      error: error.message,
    };
  }
}

module.exports = {
  geocodeLocation,
};
