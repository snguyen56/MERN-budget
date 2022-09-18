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
} = require("../controllers/expenseController");

const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

router.get("/", getExpenses);

router.get("/sum", getExpenseSum);

router.get("/month", getMonthlyExpenses);

router.get("/month/sum", getMonthlyExpenseSum);

router.get("/:id", getExpense);

router.post("/", createExpense);

router.delete("/:id", deleteExpense);

router.patch("/:id", updateExpense);

module.exports = router;
