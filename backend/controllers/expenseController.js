const Expense = require("../models/expenseModel");
const mongoose = require("mongoose");

// get a single expense
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

//get all expenses
const getExpenses = async (req, res) => {
  const user_id = req.user._id;
  const expenses = await Expense.find({ user_id }).sort({ date: -1 });
  res.status(200).json(expenses);
};

// get the sum of all expenses
const getExpenseSum = async (req, res) => {
  const user_id = req.user._id;
  const expense = await Expense.aggregate([
    {
      $match: {
        user_id: user_id.toString(),
      },
    },
    {
      $group: {
        _id: null,
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

// get all expenses for the current month
const getMonthlyExpenses = async (req, res) => {
  const user_id = req.user._id;
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

//get the sum of all expenses for the current month
const getMonthlyExpenseSum = async (req, res) => {
  const user_id = req.user._id;
  var date = new Date();
  var start = new Date(date.getFullYear(), date.getMonth(), 1);
  var end = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const expenses = await Expense.aggregate([
    {
      $match: {
        user_id: user_id.toString(),
        date: {
          $gte: start,
          $lt: end,
        },
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$amount",
        },
      },
    },
  ]);
  if (expenses.length == 0) {
    return res.status(404).json({ error: "No expense data available" });
  }
  res.status(200).json(expenses);
};

//get the expenses split by category
const getExpensesCategory = async (req, res) => {
  const user_id = req.user._id;
  const expense = await Expense.aggregate([
    {
      $match: {
        user_id: user_id.toString(),
      },
    },
    {
      $group: {
        _id: "$category",
        total: {
          $sum: "$amount",
        },
      },
    },
  ]).sort("-total");
  if (expense.length == 0) {
    return res.status(404).json({ error: "No expense data available" });
  }
  res.status(200).json(expense);
};

// create new expense
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

// delete expense
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

// update expense
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
  getMonthlyExpenseSum,
  getExpensesCategory,
};
