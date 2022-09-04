const Income = require("../models/incomeModel");
const mongoose = require("mongoose");

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

const getIncomes = async (req, res) => {
  const incomes = await Income.find({}).sort({ createdAt: -1 });
  res.status(200).json(incomes);
};

const getIncomeSum = async (req, res) => {
  const incomes = await Income.aggregate([
    {
      $group: {
        _id: null, //change to user ID
        total: {
          $sum: "$amount",
        },
      },
    },
  ]);
  res.status(200).json(incomes);
};

const createIncome = async (req, res) => {
  const { title, amount, category, date } = req.body;

  try {
    const income = await Income.create({ title, amount, category, date });
    res.status(200).json(income);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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

const dummyIncome = async (req, res) => {
  console.log("ENTER DUMMY INCOME");
  const currentMonth = Date.now();
  const prevMonth = new Date();
  prevMonth.setMonth(prevMonth.getMonth() - 1);
  const twoMonthsBack = new Date();
  twoMonthsBack.setMonth(twoMonthsBack.getMonth() - 2);
  const threeMonthsBack = new Date();
  threeMonthsBack.setMonth(threeMonthsBack.getMonth() - 3);
  try {
    const income = await Income.insertMany([
      {
        title: "rent",
        amount: "500",
        category: "Misc",
        date: currentMonth,
      },
      {
        title: "gas",
        amount: "50",
        category: "Misc",
        date: currentMonth,
      },
      {
        title: "rent",
        amount: "500",
        category: "Misc",
        date: prevMonth,
      },
      {
        title: "student loans",
        amount: "10000",
        category: "Misc",
        date: prevMonth,
      },
      {
        title: "rent",
        amount: "500",
        category: "Misc",
        date: twoMonthsBack,
      },
      {
        title: "groceries",
        amount: "350",
        category: "Misc",
        date: twoMonthsBack,
      },
      {
        title: "rent",
        amount: "500",
        category: "Misc",
        date: threeMonthsBack,
      },
      {
        title: "water bill",
        amount: "200",
        category: "Misc",
        date: threeMonthsBack,
      },
    ]);
    res.status(200).json(income);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getIncome,
  getIncomes,
  createIncome,
  deleteIncome,
  updateIncome,
  getIncomeSum,
  dummyIncome,
};
