const Month = require("../models/monthModel");
const mongoose = require("mongoose");

// get transaction data from last month
const getLastMonth = async (req, res) => {
  const user_id = req.user._id;
  const month = await Month.find({ user_id }).sort({ createdAt: -1 }).limit(1);
  res.status(200).json(month);
};
// create data for a month
const createMonth = async (req, res) => {
  const { date, total_income, total_expense, profit } = req.body;

  try {
    const user_id = req.user._id;
    const month = await Month.create({
      date,
      total_income,
      total_expense,
      profit,
      user_id,
    });
    res.status(200).json(month);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getLastMonth, createMonth };
