require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const incomeRoutes = require("./routes/incomeRoutes");

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());

app.use("/api/income", incomeRoutes);

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
