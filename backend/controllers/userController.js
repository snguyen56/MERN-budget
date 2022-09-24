const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    //create token
    const token = createToken(user._id);
    res.status(200).json({ email, user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);

    //create token
    const token = createToken(user._id);

    res.status(200).json({ email, user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateBudget = async (req, res) => {
  const user = await User.findById(req.user._id);
  try {
    user.budgets.id(req.body._id).budget = req.body.budget;
    user.save();
    res.status(200).json(user.budgets.id(req.body._id));
  } catch (error) {
    return res.status(404).json({ error: "Income not found" });
  }
};

const addGoal = async (req, res) => {
  const user = await User.findById(req.user.id);
  try {
    user.tasks.push({ ...req.body });
    user.save();
    res.status(200).json(user.tasks);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteGoals = async (req, res) => {
  const user = await User.findById(req.user.id);
  try {
    user.tasks.updateMany({ _id: req.body._id }, { tasks: [...req.body] });
    user.save();
    res.status(200).json(user.tasks);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser, updateBudget, addGoal, deleteGoals };
