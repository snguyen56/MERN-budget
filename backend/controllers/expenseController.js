const Expense = require("../models/expenseModel");
const mongoose = require("mongoose");

const getExpense = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Data type not an ID" });
  }
  const expense = await Expense.findById(id);
  if (!expense) {
    return res.status(404).json({ error: "Expense not found" });
  }
  res.status(200).json(expense);
};

const getExpenses = async (req, res) => {
  const user_id = req.user._id;
  const expenses = await Expense.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(expenses);
};

const getExpenseSum = async (req, res) => {
  const user_id = req.user._id;
  const expense = await Expense.aggregate([
    {
      "$match": {
        user_id: user_id.toString(),
      },
    },
    {
      $group: {
        _id: null, //change to user ID
        total: {
          $sum: "$amount",
        },
      },
    },
  ]);
  if (expense.length == 0) {
    return res.status(404).json({ error: "No expense data available" });
  }
  res.status(200).json(expense);
};

const getMonthlyExpenses = async (req, res) => {
  var date = new Date();
  var start = new Date(date.getFullYear(), date.getMonth(), 1);
  var end = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const expenses = await Expense.find({
    date: {
      $gte: start,
      $lt: end,
    },
  })
    .where("user_id")
    .equals(user_id)
    .sort({ date: -1 });
  res.status(200).json(expenses);
};

const createExpense = async (req, res) => {
  const { title, amount, category, date } = req.body;

  try {
    const user_id = req.user._id;
    const expense = await Expense.create({
      title,
      amount,
      category,
      date,
      user_id,
    });
    res.status(200).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Data type not an ID" });
  }
  const expense = await Expense.findOneAndDelete({ _id: id });
  if (!expense) {
    return res.status(404).json({ error: "Expense not found" });
  }
  res.status(200).json(expense);
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Data type not an ID" });
  }
  const expense = await Expense.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!expense) {
    return res.status(404).json({ error: "Expense not found" });
  }
  res.status(200).json(expense);
};

module.exports = {
  getExpense,
  getExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
  getExpenseSum,
  getMonthlyExpenses,
};
