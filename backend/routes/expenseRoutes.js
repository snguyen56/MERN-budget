const express = require("express");
const router = express.Router();

const Expense = require("../models/expenseModel");
const {
  getExpense,
  getExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
  getExpenseSum,
  getMonthlyExpenses,
  getExpensesCategory,
} = require("../controllers/expenseController");

const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

router.get("/category", getExpensesCategory);

router.get("/sum", getExpenseSum);

router.get("/month", getMonthlyExpenses);

router.get("/:id", getExpense);

router.delete("/:id", deleteExpense);

router.patch("/:id", updateExpense);

router.get("/", getExpenses);

router.post("/", createExpense);

module.exports = router;
