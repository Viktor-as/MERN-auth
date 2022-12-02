import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import taskReducer from "../features/tasks/taskSlice";
import usersReducer from "../features/users/usersSlice";
import colorModeReducer from "../features/colorMode/colorModeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    colorMode: colorModeReducer,
    users: usersReducer,
  },
});
