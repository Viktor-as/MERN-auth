const express = require("express");
const router = express.Router();
const {
  getTasks,
  setTask,
  updateTask,
  deleteTask,
  getUsers,
  getAssignedTasks,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

// /api/tasks
router.route("/").get(protect, getTasks).post(protect, setTask);
router.route("/assigned-tasks").get(protect, getAssignedTasks);
router.route("/users").get(protect, getUsers);
router.route("/:id").put(protect, updateTask).delete(protect, deleteTask);

module.exports = router;
