const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// attempt to login, create token if successful
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    //create token
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create new user
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

// update budget value
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

// add task to TO DO list
const addTask = async (req, res) => {
  const user = await User.findById(req.user._id);
  try {
    user.tasks.push({ ...req.body });
    user.save();
    res.status(200).json(user.tasks);
  } catch (error) {
    return res.status(404).json({ error: "Income not found" });
  }
};

// remove 1 or more tasks from document
const deleteTask = async (req, res) => {
  const user = await User.findById(req.user._id);
  try {
    req.body.forEach((element) => {
      user.tasks.pull(element);
    });
    user.save();
    res.status(200).json(user.tasks);
  } catch (error) {
    return res.status(404).json({ error: "Income not found" });
  }
};

module.exports = { loginUser, signupUser, updateBudget, addTask, deleteTask };
