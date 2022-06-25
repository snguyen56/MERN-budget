require("dotenv").config();
const express = require("express");
const incomeRoutes = require("./routes/incomeRoutes");

const port = process.env.PORT || 4000;

const app = express();

app.use("/api/income", incomeRoutes);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
