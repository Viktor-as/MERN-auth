import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { Box, useTheme, Typography, Button, MenuItem } from "@mui/material";
import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-mui";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PageHeading from "../components/PageHeading";
import Spinner from "../components/Spinner";
import { getTasks, updateTask, reset } from "../features/tasks/taskSlice";
import { getUsers } from "../features/users/usersSlice";
import { tokens } from "../theme";

export default function EditAssignedTask() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.tasks
  );
  const { users } = useSelector((state) => state.users);
  const taskToEdit = tasks.find((task) => task._id === id);
  const createdAt = tasks.length > 0 ? formatDate(taskToEdit.createdAt) : "";
  const updatedAt = tasks.length > 0 ? formatDate(taskToEdit.updatedAt) : "";
  const deadline = tasks.length > 0 ? formatDate(taskToEdit.deadline) : "";
  const [editMode, setEditMode] = useState(false);

  console.log("taskToEdit", taskToEdit);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (user && users.length === 0) {
      dispatch(getUsers());
    }

    if (user && tasks.length === 0) {
      dispatch(getTasks());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, dispatch, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  function formatDate(date) {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }

    return [day, month, year].join("-");
  }

  const initialValues = {
    ...taskToEdit,
  };

  async function handleFormSubmit(values, actions) {
    try {
      actions.setSubmitting(true);
      await dispatch(updateTask(values)).unwrap();
      actions.setSubmitting(false);
      toast.success("Task successfully updated!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setEditMode(false);
      actions.resetForm({
        values: initialValues,
      });
    } catch (err) {
      toast.error(err, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      dispatch(reset());
    }
  }

  return (
    <div>
      <Box m="40px">
        <PageHeading
          title="TASK ASSIGNED TO YOU"
          subtitle="Check and update the status"
        />
        <Typography variant="h3">Task</Typography>
        <Typography variant="body1" mt=".3rem">
          {taskToEdit?.task}
        </Typography>
        <Box mt="4rem" display="flex" gap="30px">
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
              {tasks.length > 0 ? createdAt : ""}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5">Last time updated</Typography>
            <Typography variant="body1" mt=".3rem">
              {tasks.length > 0 ? updatedAt : ""}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5">Assigned to</Typography>
            <Typography variant="body1" mt=".3rem">
              {tasks.length > 0
                ? taskToEdit.users.map((user) => user.name).join(", ")
                : ""}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5">Deadline</Typography>
            <Typography variant="body1" mt=".3rem">
              {tasks.length > 0 ? deadline : ""}
            </Typography>
          </Box>
        </Box>
        <Box mt="4rem">
          <Typography variant="h3">Status</Typography>
          <Box
            width="120px"
            mt=".5rem"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              taskToEdit?.status === "In progress"
                ? colors.status.yellow
                : colors.status.green
            }
            color={"black"}
            borderRadius="4px"
          >
            {taskToEdit?.status === "In progress" && <PendingIcon />}
            {taskToEdit?.status === "Completed" && <CheckCircleIcon />}
            <Typography sx={{ ml: "5px" }}>{taskToEdit?.status}</Typography>
          </Box>
          {!editMode && (
            <Box display="flex" gap="1rem">
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  mt: "1rem",
                }}
                onClick={() => setEditMode(true)}
              >
                Edit status
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  mt: "1rem",
                }}
                onClick={() => navigate("/")}
              >
                Go back
              </Button>
            </Box>
          )}

          {editMode && (
            <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
              {({ handleSubmit, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap="30px"
                    width="50%"
                  >
                    <Field
                      component={TextField}
                      type="text"
                      name="status"
                      label="Status"
                      select
                      variant="filled"
                      helperText="Please select new status"
                      margin="normal"
                    >
                      <MenuItem value={"In progress"}>In progress</MenuItem>
                      <MenuItem value={"Completed"}>Completed</MenuItem>
                    </Field>
                  </Box>
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{
                      mt: "1rem",
                    }}
                  >
                    Update status
                  </Button>
                </Form>
              )}
            </Formik>
          )}
        </Box>
      </Box>
    </div>
  );
}
