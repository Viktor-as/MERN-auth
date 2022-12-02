import { Box, Button, TextField, Checkbox } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { Formik, Field, Form } from "formik";
import { Autocomplete } from "formik-mui";
import * as yup from "yup";

import PageHeading from "../components/PageHeading";
import { createTask } from "../features/tasks/taskSlice";
import { getUsers } from "../features/users/usersSlice";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const checkoutSchema = yup.object().shape({
  task: yup.string().required("required"),
  users: yup.array().required("At least one User is required"),
  deadline: yup.number().required("required"),
});
const initialValues = {
  task: "",
  users: [],
  deadline: "",
  status: "In progress",
};

function AddTask() {
  const [userList, setUserList] = useState([]);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    if (!users.users) {
      dispatch(getUsers());
    }
  }, []);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values, actions) => {
    try {
      actions.setSubmitting(true);
      await dispatch(createTask(values));
      actions.setSubmitting(false);
      toast.success("Task created successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      actions.resetForm({
        values: initialValues,
      });
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <Box m="40px">
      <PageHeading title="CREATE A TASK" subtitle="Create a New Task" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
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
              // gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
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
                sx={{ gridColumn: "span 4" }}
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
                style={{ gridColumn: "span 2" }}
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
                  <TextField
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
                    <TextField
                      {...params}
                      error={!!touched.deadline && !!errors.deadline}
                      helperText={touched.deadline && errors.deadline}
                    />
                  )}
                />
              </LocalizationProvider>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  Create a New Task
                </Button>
                <Button
                  type="button"
                  color="secondary"
                  variant="contained"
                  disabled={!dirty || isSubmitting}
                  onClick={handleReset}
                  sx={{
                    ml: "10px",
                  }}
                >
                  Reset
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default AddTask;
