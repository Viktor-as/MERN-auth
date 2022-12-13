import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import {
  Box,
  useTheme,
  Typography,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
} from "@mui/material";
import MuiTextField from "@mui/material/TextField";
import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { Formik, Field, Form } from "formik";
import { TextField, Select, Autocomplete } from "formik-mui";

import PageHeading from "../components/PageHeading";
import Spinner from "../components/Spinner";
import {
  getTasks,
  updateTask,
  deleteTask,
  reset,
} from "../features/tasks/taskSlice";
import { getUsers } from "../features/users/usersSlice";
import { tokens } from "../theme";
import DeleteDialog from "../components/DeleteDialog";

export default function EditTask() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading, isError, message, isDeletedSuccessfully } =
    useSelector((state) => state.tasks);
  const { users } = useSelector((state) => state.users);
  const taskToEdit = tasks.find((task) => task._id === id);
  const createdAt = tasks.length > 0 ? formatDate(taskToEdit.createdAt) : "";
  const updatedAt = tasks.length > 0 ? formatDate(taskToEdit.updatedAt) : "";
  const deadline = tasks.length > 0 ? formatDate(taskToEdit.deadline) : "";
  const [editMode, setEditMode] = useState(false);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  // Delete dialog state
  const [open, setOpen] = useState(false);

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
  }, [user, isError, message, dispatch, navigate, isDeletedSuccessfully]);

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

  // Delete dialog

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteTask(taskToEdit._id)).unwrap();
      toast.success("Task successfully deleted!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/");
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
      setOpen(false);
    }
  };

  //Form

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
        <DeleteDialog
          open={open}
          handleClose={handleClose}
          handleDelete={handleDelete}
        />
        <PageHeading title="YOUR TASK" subtitle="Edit your task" />
        {!editMode && (
          <>
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

              <Box display="flex" gap="1rem">
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    mt: "1rem",
                  }}
                  onClick={() => setEditMode(true)}
                >
                  Edit task
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    mt: "1rem",
                    // bgcolor: "primary.main",
                  }}
                  onClick={handleClickOpen}
                >
                  Delete this task
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
            </Box>
          </>
        )}

        {editMode && (
          <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              dirty,
              handleReset,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap="30px"
                  width="50%"
                >
                  <MuiTextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Task"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.task}
                    name="task"
                    error={!!touched.task && !!errors.task}
                    helperText={touched.task && errors.task}
                    multiline
                    rows={4}
                  />
                  <Field
                    name="users"
                    multiple
                    disableCloseOnSelect
                    component={Autocomplete}
                    options={users}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.name}
                      </li>
                    )}
                    renderInput={(params) => (
                      <MuiTextField
                        {...params}
                        name="users"
                        error={touched["users"] && !!errors["users"]}
                        helperText={touched["users"] && errors["users"]}
                        label="Choose Users for this task"
                        variant="filled"
                        placeholder="Start typing to find faster"
                      />
                    )}
                  />

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Deadline"
                      inputFormat="MM/DD/YYYY"
                      name="deadline"
                      onBlur={handleBlur}
                      onChange={(value) => {
                        setFieldValue("deadline", Date.parse(value));
                      }}
                      value={values.deadline || null}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          error={!!touched.deadline && !!errors.deadline}
                          helperText={touched.deadline && errors.deadline}
                        />
                      )}
                    />
                  </LocalizationProvider>
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
                <Box display="flex" gap="1rem">
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{
                      mt: "1rem",
                    }}
                  >
                    Update task
                  </Button>
                  <Button
                    type="button"
                    color="secondary"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{
                      mt: "1rem",
                    }}
                    onClick={() => setEditMode(false)}
                  >
                    Cancel Edit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        )}
      </Box>
    </div>
  );
}
