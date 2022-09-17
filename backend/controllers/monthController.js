const Month = require("../models/monthModel");
const mongoose = require("mongoose");

const getLastMonth = async (req, res) => {
  const month = await Month.find({}).sort({ createdAt: -1 }).limit(1);
  res.status(200).json(month);
};

const createMonth = async (req, res) => {
  const { date, total_income, total_expense, profit } = req.body;

  try {
    const month = await Month.create({
      date,
      total_income,
      total_expense,
      profit,
    });
    res.status(200).json(month);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getLastMonth, createMonth };
