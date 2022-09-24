const express = require("express");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

const {
  loginUser,
  signupUser,
  updateBudget,
  addGoal,
  deleteGoals,
} = require("../controllers/userController");

//login
router.post("/login", loginUser);

//signup
router.post("/signup", signupUser);

router.use(requireAuth);

//update budget
router.patch("/budget", updateBudget);
//add goal
router.post("/goal/add", addGoal);
//delete goal
router.delete("/goal/delete", deleteGoals);
module.exports = router;
