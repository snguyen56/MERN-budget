const express = require("express");
const router = express.Router();

const Expense = require("../models/expenseModel");
const {
  getExpense,
  getExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
} = require("../controllers/expenseController");

router.get("/", getExpenses);

router.get("/:id", getExpense);

router.post("/", createExpense);

router.delete("/:id", deleteExpense);

router.patch("/:id", updateExpense);

module.exports = router;
