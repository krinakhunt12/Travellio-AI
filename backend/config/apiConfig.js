// config/apiConfig.js
const API_KEYS = {
  TRAVELPAYOUTS: process.env.TRAVELPAYOUTS_KEY,
  OPEN_EXCHANGE_RATES: process.env.OPEN_EXCHANGE_RATES_KEY,
  OPENROUTESERVICE: process.env.ORS_API_KEY,
};

const API_URLS = {
  FLIGHT_SEARCH: "https://api.travelpayouts.com/aviasales/v3/prices_for_dates",
  CURRENCY: "https://openexchangerates.org/api/latest.json",
  ROUTE: "https://api.openrouteservice.org/v2/directions/driving-car",
};

module.exports = { API_KEYS, API_URLS };
