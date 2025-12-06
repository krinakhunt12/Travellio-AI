// routes/budgetRoutes.js
const express = require("express");
const { generateBudget } = require("../agents/budget-calculator/budgetAgent.js");

const router = express.Router();

router.post("/calculate", generateBudget);

module.exports = router;
