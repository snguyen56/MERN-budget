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
  getMonthlyExpenseSum,
  getExpensesCategory,
  getMonthlyExpensesCategory,
  getWeeklyExpenses,
  getYearlyExpenses,
} = require("../controllers/expenseController");

const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

router.get("/category", getExpensesCategory);

router.get("/week", getWeeklyExpenses);

router.get("/year", getYearlyExpenses);

router.get("/category/month", getMonthlyExpensesCategory);

router.get("/sum", getExpenseSum);

router.get("/month", getMonthlyExpenses);

router.get("/month/sum", getMonthlyExpenseSum);

router.get("/:id", getExpense);

router.delete("/:id", deleteExpense);

router.patch("/:id", updateExpense);

router.get("/", getExpenses);

router.post("/", createExpense);

module.exports = router;
