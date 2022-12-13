import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "/api/tasks/"
    : "http://localhost:5000/api/tasks/";

// Create new task
const createTask = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, taskData, config);

  return response.data;
};

// Get user tasks
const getTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get assigned tasks
const getAssignedTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "assigned-tasks", config);
  return response.data;
};

// Update task
const updateTask = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + taskData._id, taskData, config);

  return response.data;
};

// Delete user task
const deleteTask = async (taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + taskId, config);

  return response.data;
};

const taskService = {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
  getAssignedTasks,
};

export default taskService;
