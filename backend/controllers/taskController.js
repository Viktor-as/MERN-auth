const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Task = require("../models/taskModel");

//@desc Get tasks
//@route Get /api/tasks
//@access Private
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });

  res.status(200).json(tasks);
});

//@desc Get assiigned tasks
//@route Get /api/tasks/assigned-tasks
//@access Private
const getAssignedTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ "users.id": req.user.id });

  res.status(200).json(tasks);
});

//@desc Get Users
//@route Get /api/tasks/users
//@access Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  const userData = users.map((user) => ({ id: user._id, name: user.name }));

  res.status(200).json(userData);
});

//@desc Set tasks
//@route POST /api/tasks
//@access Private
const setTask = asyncHandler(async (req, res) => {
  if (!req.body.task) {
    res.status(400);
    throw new Error("Please add a task field");
  }
  if (!req.body.users) {
    res.status(400);
    throw new Error("Please add a users field");
  }
  if (!req.body.deadline) {
    res.status(400);
    throw new Error("Please add a deadline field");
  }

  const task = await Task.create({
    task: req.body.task,
    user: req.user.id,
    users: req.body.users,
    deadline: req.body.deadline,
    status: req.body.status,
  });

  res.status(200).json(task);
});

//@desc Update tasks
//@route PUT /api/tasks/:id
//@access Private
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }

  //check for user

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure tasks belong to that user or are assigned to them
  if (
    task.user.toString() !== req.user.id &&
    task.users.find((user) => user.id === req.user.id) === undefined
  ) {
    res.status(401);
    throw new Error("User not authorized for this task");
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTask);
});

//@desc Delete tasks
//@route DELETE /api/tasks:id
//@access Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }

  //check for user

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure tasks belong to that user
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized for this task");
  }

  await Task.remove(task);
  // arba await task.remove();

  res.status(200).json(task);
});

module.exports = {
  getTasks,
  setTask,
  updateTask,
  deleteTask,
  getUsers,
  getAssignedTasks,
};
