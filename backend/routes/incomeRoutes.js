const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Get all income" });
});

router.get("/:id", (req, res) => {
  res.json({ message: "Get a single income" });
});

router.post("/", (req, res) => {
  res.json({ message: "Create new income" });
});

router.delete("/:id", (req, res) => {
  res.json({ message: "Delete an income" });
});

router.patch("/:id", (req, res) => {
  res.json({ message: "Update an income" });
});

module.exports = router;
