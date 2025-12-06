// services/activitiesService.js
function calculateActivitiesCost(attractions = []) {
  const total = attractions.reduce((sum, a) => sum + (a.ticket || 300), 0);
  return total;
}

module.exports = { calculateActivitiesCost };
