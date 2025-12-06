// controllers/budgetController.js
const { BudgetCalculatorAgent } = require("../agents/budget-calculator/budgetAgent.js");

async function generateBudget(req, res) {
  try {
    const input = req.body;
    const result = await BudgetCalculatorAgent(input);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
