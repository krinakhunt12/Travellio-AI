function convertToINR(price, currency = "USD") {
  const rates = {
    USD: 83,
    EUR: 90,
    IDR: 0.005
  };

  const rate = rates[currency] || 1;
  return Math.round(price * rate);
}

module.exports = { convertToINR };
