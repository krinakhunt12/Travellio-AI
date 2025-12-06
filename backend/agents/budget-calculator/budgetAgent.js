// agents/budgetAgent.js
const { getFlightEstimate } = require( "../../services/flightService.js");
const { calculateHotelCost } = require("../../services/hotelService.js");
const { calculateFoodCost } = require("../../services/foodService.js");
const { calculateActivitiesCost } = require("../../services/activitiesService.js");
const { estimateLocalTransport } = require("../../services/transportService.js");
const { roundToNearest, calculateTotal } = require("../../utils/calculate.js");

async function BudgetCalculatorAgent(input) {
  const {
    from,
    to,
    departDate,
    days,
    hotelPrice,
    nights,
    rooms,
    attractions,
    distanceKm,
  } = input;

  // 1. Flight
  const flight = await getFlightEstimate(from, to, departDate);

  // 2. Hotel
  const hotel_total = calculateHotelCost(hotelPrice, nights, rooms);

  // 3. Food
  const food_total = calculateFoodCost(days, 800);

  // 4. Activities
  const activities = calculateActivitiesCost(attractions);

  // 5. Local Transport
  const local_transport = await estimateLocalTransport(distanceKm);

  // 6. Pocket Money (15%)
  const pocket_money = roundToNearest(
    (hotel_total + food_total + local_transport + activities) * 0.15
  );

  const totals = {
    hotel_total,
    food_total,
    local_transport,
    activities,
    flight,
    pocket_money,
  };

  const total_trip_cost = calculateTotal(totals);

  return {
    ...totals,
    total_trip_cost,
    per_person: roundToNearest(total_trip_cost / 2),
  };
}

// Express handler wrapper
async function generateBudget(req, res) {
  try {
    const input = req.body || {};
    const result = await BudgetCalculatorAgent(input);
    res.json({ success: true, data: result });
  } catch (err) {
    console.error('Budget Agent Error:', err);
    res.status(500).json({ success: false, error: err.message || String(err) });
  }
}

module.exports = { BudgetCalculatorAgent, generateBudget };
