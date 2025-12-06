
// services/foodService.js
function calculateFoodCost(days, perDayCost = 800) {
  return days * perDayCost;
}

module.exports = { calculateFoodCost };
