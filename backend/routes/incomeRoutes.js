const express = require("express");
const router = express.Router();

const Income = require("../models/incomeModel");
const {
  getIncome,
  getIncomes,
  createIncome,
  deleteIncome,
  updateIncome,
  getIncomeSum,
  getMonthlyIncomes,
  getIncomeCategory,
} = require("../controllers/incomeController");

const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

router.get("/category", getIncomeCategory);

router.get("/sum", getIncomeSum);

router.get("/month", getMonthlyIncomes);

router.get("/:id", getIncome);

router.delete("/:id", deleteIncome);

router.patch("/:id", updateIncome);

router.get("/", getIncomes);

router.post("/", createIncome);

module.exports = router;
