// services/currencyService.js
const axios = require("axios");
const { API_KEYS, API_URLS } = require("../config/apiConfig.js");

async function convertCurrency(amount, to = "INR") {
  try {
    const res = await axios.get(API_URLS.CURRENCY, {
      params: { app_id: API_KEYS.OPEN_EXCHANGE_RATES },
    });

    const rate = res.data.rates[to];
    return amount * rate;
  } catch (error) {
    return amount; // fallback
  }
}

module.exports = { convertCurrency };
