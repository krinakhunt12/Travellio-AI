module.exports = {
  FINAL_ITINERARY_PROMPT: (rawPlan) => `
You are an expert travel planner.

Convert the following raw optimized plan into a beautiful day-wise itinerary.

Include:
- Opening hours
- Seasonal tips
- Warnings (crowd, weather issues)
- Alternative place if crowded
- Highlight ticket prices & durations

Raw plan:
${JSON.stringify(rawPlan, null, 2)}

Return FINAL itinerary in JSON with keys:
day, morning, afternoon, evening, notes
`
};
