require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const userRoutes = require("./routes/userRoutes");

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());

app.use("/api/income", incomeRoutes);

app.use("/api/expense", expenseRoutes);

app.use("/api/user", userRoutes);
app.use("/api/signup", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`connected to database & listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
