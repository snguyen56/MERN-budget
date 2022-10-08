const Income = require("../models/incomeModel");
const mongoose = require("mongoose");

// get a single income
const getIncome = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Data type not an ID" });
  }
  const income = await Income.findById(id);
  if (!income) {
    return res.status(404).json({ error: "Income not found" });
  }
  res.status(200).json(income);
};

// get all incomes
const getIncomes = async (req, res) => {
  const user_id = req.user._id;
  const incomes = await Income.find({ user_id }).lean().sort({ date: -1 });
  res.status(200).json(incomes);
};

// get sum of all incomes
const getIncomeSum = async (req, res) => {
  const user_id = req.user._id;
  const incomes = await Income.aggregate([
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
  if (incomes.length == 0) {
    return res.status(404).json({ error: "No income data available" });
  }
  res.status(200).json(incomes);
};

// get sum of all incomes for the current month
const getMonthlyIncomeSum = async (req, res) => {
  const user_id = req.user._id;
  var date = new Date();
  var start = new Date(date.getFullYear(), date.getMonth(), 1);
  var end = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const incomes = await Income.aggregate([
    {
      $match: {
        user_id: user_id.toString(),
      },
    },
    {
      $match: {
        date: {
          $gte: start,
          $lt: end,
        },
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
  if (incomes.length == 0) {
    return res.status(404).json({ error: "No income data available" });
  }
  res.status(200).json(incomes);
};

// get all incomes for the current month
const getMonthlyIncomes = async (req, res) => {
  const user_id = req.user._id;
  var date = new Date();
  var start = new Date(date.getFullYear(), date.getMonth(), 1);
  var end = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const incomes = await Income.find({
    date: {
      $gte: start,
      $lt: end,
    },
  })
    .where("user_id")
    .equals(user_id)
    .sort({ date: -1 });
  res.status(200).json(incomes);

  // const user_id = req.user._id;
  // const incomes = await Income.find({ user_id }).sort({ createdAt: -1 });
  // res.status(200).json(incomes);
};

// get all incomes split by category
const getIncomeCategory = async (req, res) => {
  const user_id = req.user._id;
  const income = await Income.aggregate([
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
  if (income.length == 0) {
    return res.status(404).json({ error: "No income data available" });
  }
  res.status(200).json(income);
};

// create income
const createIncome = async (req, res) => {
  const { title, amount, category, date } = req.body;

  try {
    const user_id = req.user._id;
    const income = await Income.create({
      title,
      amount,
      category,
      date,
      user_id,
    });
    res.status(200).json(income);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete income
const deleteIncome = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Data type not an ID" });
  }
  const income = await Income.findOneAndDelete({ _id: id });
  if (!income) {
    return res.status(404).json({ error: "Income not found" });
  }
  res.status(200).json(income);
};

// update income
const updateIncome = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Data type not an ID" });
  }
  const income = await Income.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!income) {
    return res.status(404).json({ error: "Income not found" });
  }
  res.status(200).json(income);
};

module.exports = {
  getIncome,
  getIncomes,
  createIncome,
  deleteIncome,
  updateIncome,
  getIncomeSum,
  getMonthlyIncomes,
  getMonthlyIncomeSum,
  getIncomeCategory,
};
