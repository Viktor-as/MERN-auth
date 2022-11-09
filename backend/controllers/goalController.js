const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Goal = require("../models/goalModel");

//@desc Get goals
//@route Get /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
});

//@desc Set goals
//@route Get /api/goals
//@access Private
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

//@desc Update goals
//@route Get /api/goals:id
//@access Private
const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  //check for user

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure goals belong to that user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized for this goal");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

//@desc Delete goals
//@route Get /api/goals:id
//@access Private
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  //check for user

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure goals belong to that user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized for this goal");
  }

  await Goal.remove(goal);
  // arba await goal.remove();

  res.status(200).json({
    message: `Deleted goal ${req.params.id}`,
    id: req.params.id,
  });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};
