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
  const expenses = await Expense.find({}).sort({ createdAt: -1 });
  res.status(200).json(expenses);
};

const getExpenseSum = async (req, res) => {
  const expense = await Expense.aggregate([
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

const createExpense = async (req, res) => {
  const { title, amount } = req.body;

  try {
    const expense = await Expense.create({ title, amount });
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
};
