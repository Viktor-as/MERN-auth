import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

import { toast } from "react-toastify";
import {
  Box,
  Button,
  TextField,
  Checkbox,
  Paper,
  useTheme,
  Typography,
} from "@mui/material";
import { tokens } from "../theme";
import LoginIcon from "@mui/icons-material/Login";

import { Formik, Field, Form } from "formik";
import * as yup from "yup";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  const initialValues = {
    email: "",
    password: "",
  };

  const checkoutSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("Password is required"),
  });

  function handleFormSubmit(values) {
    dispatch(login(values));
  }

  function loginAsTestUser() {
    const userData = {
      email: "test@test.com",
      password: "123",
    };
    dispatch(login(userData));
  }

  return (
    <Box display="flex" alignItems="center" minHeight="90vh">
      <Paper
        elevation={10}
        sx={{
          minHeight: "35rem",
          margin: "3rem auto",
          minWidth: "30rem",
          backgroundColor: colors.primary[400],
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center" gap=".5rem">
          <LoginIcon sx={{ fontSize: 30 }} />
          <Typography variant="h1">Login</Typography>
        </Box>
        <Box width="60%" mt="2rem">
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
                  gap="20px"
                  width="100%"
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{}}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{}}
                  />
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    Login
                  </Button>
                  <Typography variant="h5">
                    To test this application you can login as a Test User (no
                    need to fill out the form)
                  </Typography>
                  <Button
                    type="button"
                    color="secondary"
                    variant="contained"
                    disabled={isSubmitting}
                    onClick={loginAsTestUser}
                  >
                    Login as Test User
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;