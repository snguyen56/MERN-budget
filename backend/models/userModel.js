const mongoose = require("mongoose");
const bcryt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const budgetSchema = new Schema({
  name: { type: String },
  budget: { type: Number },
});

const monthSchema = new Schema({
  date: { type: Date, default: Date.now },
  totalIncome: { type: Number, default: 0, required: true },
  totalExpenses: { type: Number, default: 0, required: true },
  grossProfit: { type: Number, default: 0, required: true },
});

const taskSchema = new Schema({ name: { type: String } });

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  budgets: [budgetSchema],
  currentMonth: monthSchema,
  tasks: [taskSchema],
});

//signup method
userSchema.statics.signup = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }
  const salt = await bcryt.genSalt();
  const hash = await bcryt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

//login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  //compare password with hased password
  const match = await bcryt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
