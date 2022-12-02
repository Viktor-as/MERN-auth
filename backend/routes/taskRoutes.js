const express = require("express");
const router = express.Router();
const {
  getTasks,
  setTask,
  updateTask,
  deleteTask,
  getUsers,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getTasks).post(protect, setTask);
router.route("/users").get(protect, getUsers);
router.route("/:id").put(protect, updateTask).delete(protect, deleteTask);

module.exports = router;
