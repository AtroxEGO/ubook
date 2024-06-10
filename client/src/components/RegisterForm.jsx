import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import {
  businessCreateSchema,
  userCreateSchema,
} from "../utils/validationSchemas";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import defaultTheme from "../utils/themes";
import { useDispatch } from "react-redux";
import {
  useCreateBusinessMutation,
  useCreateUserMutation,
} from "../services/api/apiSlice";
import { BottomFormInputs } from "./BottomRegisterFormInputs";
import { UserFormInputs } from "./UserRegisterFormInputs";
import { BusinessRegisterFormInputs } from "./BusinessRegisterFormInputs";
import { setSnack } from "../services/store/features/snackSlice";
import { handleLogin } from "../utils/helpers";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createUser, { isLoading: userLoading }] = useCreateUserMutation();
  const [createBusiness, { isLoading: businessLoading }] =
    useCreateBusinessMutation();
  const isLoading = userLoading || businessLoading;
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const userFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      allowsMarketing: false,
      accountType: useLocation().state?.accountType || "user",
    },
    validationSchema: userCreateSchema,
    onSubmit: (values) => {
      console.log(values);
      createUser({
        email: values.email,
        password: values.password,
        first_name: values.firstName,
        last_name: values.lastName,
        allows_marketing: values.allowsMarketing,
      })
        .unwrap()
        .then((data) => {
          dispatch(setSnack(data));
          handleLogin(data, dispatch);
          navigate("/");
        })
        .catch((error) => {
          dispatch(setSnack(error));
        });
    },
  });

  const businessFormik = useFormik({
    initialValues: {
      businessName: "",
      email: "",
      password: "",
      allowsMarketing: false,
      address: "",
      accountType: useLocation().state?.accountType || "user",
    },
    validationSchema: businessCreateSchema,
    onSubmit: (values) => {
      console.log(values);
      createBusiness({
        email: values.email,
        password: values.password,
        name: values.businessName,
        avatar_url: "",
        address: values.address,
        allows_marketing: values.allowsMarketing,
      })
        .unwrap()
        .then((data) => {
          dispatch(setSnack(data));
          handleLogin(data, dispatch);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          dispatch(setSnack(error));
        });
    },
  });
  const [accountType, setAccountType] = useState(
    useLocation().state?.accountType || "user"
  );
  return (
    <ThemeProvider theme={defaultTheme(accountType, prefersDarkMode)}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: "primary.main",
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
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
          onSubmit={
            accountType === "user"
              ? userFormik.handleSubmit
              : businessFormik.handleSubmit
          }
        >
          {accountType === "user" ? (
            <UserFormInputs userFormik={userFormik} />
          ) : (
            <BusinessRegisterFormInputs businessFormik={businessFormik} />
          )}
          <BottomFormInputs
            userFormik={userFormik}
            setAccountType={setAccountType}
            isLoading={isLoading}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default RegisterForm;
