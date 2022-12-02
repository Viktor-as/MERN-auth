import { useParams } from "react-router-dom";
import { Box, useTheme, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeading from "../components/PageHeading";
import Spinner from "../components/Spinner";
import { getTasks } from "../features/tasks/taskSlice";
import { getUsers } from "../features/users/usersSlice";

export default function EditTask() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.tasks
  );
  const { users } = useSelector((state) => state.users);
  const taskToEdit = tasks.find((task) => task._id === id);
  console.log("taskToEdit", taskToEdit);
  console.log("tasks", tasks);
  console.log("users", users);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    if (user) {
      dispatch(getUsers());
      dispatch(getTasks());
    }

    // return () => {
    //   dispatch(reset());
    // };
  }, [user, isError, message, dispatch, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <Box m="40px">
        <PageHeading title="YOUR TASK" subtitle="Edit your task" />
        <Typography variant="h3">Task</Typography>
        <Typography variant="body1" mt=".3rem">
          {taskToEdit?.task}
        </Typography>
        <Box mt="4rem">
          <Box>
            <Typography variant="h5">Created by</Typography>
            <Typography variant="body1" mt=".3rem">
              {tasks.length > 0 && users.length > 0
                ? users.find((user) => user.id === taskToEdit.user).name
                : ""}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5">Creation date</Typography>
            <Typography variant="body1" mt=".3rem">
              {tasks.length > 0
                ? new Date(taskToEdit.createdAt).toDateString()
                : ""}
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
