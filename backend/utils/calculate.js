// utils/calculate.js
function roundToNearest(value) {
  return Math.round(value);
}

function calculateTotal(parts) {
  return Object.values(parts).reduce((acc, val) => acc + val, 0);
}

module.exports = { roundToNearest, calculateTotal };
