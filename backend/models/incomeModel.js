const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const incomeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    amount: {
      type: Number,
      required: [true, "amount is required"],
    },
    category: {
      type: String,
      default: "Misc",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Income", incomeSchema);
