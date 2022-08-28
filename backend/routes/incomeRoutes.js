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
} = require("../controllers/incomeController");

router.get("/", getIncomes);

router.get("/sum", getIncomeSum);

router.get("/:id", getIncome);

router.post("/", createIncome);

router.delete("/:id", deleteIncome);

router.patch("/:id", updateIncome);

module.exports = router;
