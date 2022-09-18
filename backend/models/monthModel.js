const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const monthSchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    total_income: {
      type: Number,
      default: 0,
      required: true,
    },
    total_expense: {
      type: Number,
      default: 0,
      required: true,
    },
    profit: {
      type: Number,
      default: 0,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Month", monthSchema);
