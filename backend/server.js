require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const monthRoutes = require("./routes/monthRoutes");
const userRoutes = require("./routes/userRoutes");
const path = require("path");

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());

app.use("/api/income", incomeRoutes);

app.use("/api/expense", expenseRoutes);

app.use("/api/month", monthRoutes);

app.use("/api/user", userRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

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
