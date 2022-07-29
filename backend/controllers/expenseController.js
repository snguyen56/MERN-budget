const Expense = require("../models/expenseModel");
const mongoose = require("mongoose");

const getExpense = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Expense not found" });
  }
  const expense = await Expense.findById(id);
  if (!expense) {
    return res.status(404).json({ error: "Expense not found" });
  }
  res.status(200).json(income);
};

const getExpenses = async (req, res) => {
  const expenses = await Expense.find({}).sort({ createdAt: -1 });
  res.status(200).json(expenses);
};

const createExpense = async (req, res) => {
  const { title, amount } = req.body;

  try {
    const expense = await Expense.create({ title, amount });
    res.status(200).json(exxpense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Expense not found" });
  }
  const expense = await Expense.findOneAndDelete({ _id: id });
  if (!expense) {
    return res.status(400).json({ error: "Expense not found" });
  }
  res.status(200).json(expense);
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Expense not found" });
  }
  const expenmse = await Expense.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!expense) {
    return res.status(400).json({ error: "Expense not found" });
  }
  res.status(200).json(income);
};

module.exports = {
  getExpense,
  getExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
};
