const express = require("express");

const Income = require("../models/incomeModel");
const {
  getIncome,
  getIncomes,
  createIncome,
  deleteIncome,
  updateIncome,
  getIncomeSum,
  getMonthlyIncomes,
  getMonthlyIncomeSum,
  getIncomeCategory,
} = require("../controllers/incomeController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/category", getIncomeCategory);

router.get("/sum", getIncomeSum);

router.get("/month/sum", getMonthlyIncomeSum);

router.get("/month", getMonthlyIncomes);

router.get("/:id", getIncome);

router.delete("/:id", deleteIncome);

router.patch("/:id", updateIncome);

router.get("/", getIncomes);

router.post("/", createIncome);

module.exports = router;
