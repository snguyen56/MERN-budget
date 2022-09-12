const express = require("express");
const router = express.Router();

const Month = require("../models/monthModel");
const { getLastMonth, createMonth } = require("../controllers/monthController");

router.get("/", getLastMonth);

router.post("/", createMonth);

module.exports = router;
