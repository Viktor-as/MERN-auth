import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "/api/tasks/"
    : "http://192.168.8.128:5000/api/tasks/";

// Get users
const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "users", config);

  return response.data;
};

const usersService = {
  getUsers,
};

export default usersService;
