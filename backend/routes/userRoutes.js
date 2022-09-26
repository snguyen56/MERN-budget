const express = require("express");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

const {
  loginUser,
  signupUser,
  updateBudget,
  addTask,
  deleteTask,
} = require("../controllers/userController");

//login
router.post("/login", loginUser);

//signup
router.post("/signup", signupUser);

router.use(requireAuth);

//update budget
router.patch("/budget", updateBudget);

//create task
router.post("/task", addTask);

//delete task
router.delete("/task", deleteTask);

module.exports = router;
