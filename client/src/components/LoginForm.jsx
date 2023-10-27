import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  TextField,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { loginFormSchema } from "../utils/validationSchemas";
import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import defaultTheme from "../utils/themes";
import { useDispatch } from "react-redux";
import { setSnack } from "../services/store/features/snackSlice";
import { useLoginUserMutation } from "../services/api/apiSlice";
import { LoadingButton } from "@mui/lab";
import { login } from "../services/store/features/account/accountSlice";
import { jwtDecode } from "jwt-decode";

const handleLogin = (data, dispatch) => {
  const loginData = {
    token: data.token,
    accountData: jwtDecode(data.token),
  };
  dispatch(login(loginData));
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const formik = useFormik({
    initialValues: {
      email: "pawel.polakiewicz1@gmail.com",
      password: "Test123@",
      accountType: "user",
    },
    validationSchema: loginFormSchema,
    onSubmit: (values) => {
      loginUser({
        email: values.email,
        password: values.password,
      })
        .unwrap()
        .then((data) => {
          dispatch(setSnack(data));
          handleLogin(data, dispatch);
        })
        .catch((error) => {
          dispatch(setSnack(error));
        });
    },
  });

  const [accountType, setAccountType] = useState(formik.values.accountType);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { state } = useLocation();

  return (
    <ThemeProvider theme={defaultTheme(accountType, prefersDarkMode)}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Avatar
          sx={{
            m: 1,
            bgcolor: "primary.main",
          }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5">
          Login
        </Typography>
        <Box
          component="form"
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
          noValidate
          onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <ToggleButtonGroup
            color="primary"
            value={formik.values.accountType}
            exclusive
            fullWidth
            onChange={(e) => {
              formik.handleChange(e);
              setAccountType(e.target.value);
            }}
            aria-label="Account Type">
            <ToggleButton
              name="accountType"
              value="user">
              User
            </ToggleButton>
            <ToggleButton
              name="accountType"
              value="business">
              Business
            </ToggleButton>
          </ToggleButtonGroup>
          {/* {state?.path === "form" || error ? (
            <Typography
              textAlign="center"
              color="error">
              {error.data.message || state.error}
            </Typography>
          ) : null} */}
          <LoadingButton
            variant="contained"
            fullWidth
            loading={isLoading}
            type="submit">
            Submit
          </LoadingButton>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LoginForm;
