import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import { verifyFormSchema } from "../utils/validationSchemas";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/store/features/account/accountSlice";
import { useNavigate } from "react-router-dom";
import {
  api,
  useResendBusinessCodeQuery,
  useResendUserCodeQuery,
  useVerifyBusinessMutation,
  useVerifyUserMutation,
} from "../services/api/apiSlice";
import { setSnack } from "../services/store/features/snackSlice";
import { handleLogin } from "../utils/helpers";

const VerifyPage = () => {
  const [verifyUser, { isLoading: userLoading }] = useVerifyUserMutation();
  const [verifyBusiness, { isLoading: businessLoading }] =
    useVerifyBusinessMutation();
  const [resendUserCode] = api.endpoints.resendUserCode.useLazyQuery();
  const [resendBusinessCode] = api.endpoints.resendBusinessCode.useLazyQuery();
  const isLoading = userLoading || businessLoading;
  //   const isLoading = false;
  const userData = useSelector((state) => state.accountReducer.accountData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleResend = () => {
    if (userData.account === "business") {
      resendBusinessCode()
        .unwrap()
        .then((data) => {
          dispatch(setSnack(data));
        })
        .catch((error) => {
          dispatch(setSnack(error));
        });
    } else {
      resendUserCode()
        .unwrap()
        .then((data) => {
          dispatch(setSnack(data));
        })
        .catch((error) => {
          dispatch(setSnack(error));
        });
    }
  };

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: verifyFormSchema,
    onSubmit: (values) => {
      if (userData.account === "user") {
        verifyUser({
          code: values.code,
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
      } else {
        verifyBusiness({
          code: values.code,
        })
          .unwrap()
          .then((data) => {
            console.log(data);
            dispatch(setSnack(data));
            handleLogin(data, dispatch);
            navigate("/");
          })
          .catch((error) => {
            dispatch(setSnack(error));
          });
      }
    },
  });

  return (
    <Container
      maxWidth="xs"
      component="main"
      sx={{
        mt: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}>
        <Avatar
          sx={{
            m: 1,
            bgcolor: "primary.main",
          }}>
          <VpnKeyIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5">
          Verify
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
            id="code"
            name="code"
            label="Code"
            type="number"
            autoFocus
            value={formik.values.code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.code && Boolean(formik.errors.code)}
            helperText={formik.touched.code && formik.errors.code}
          />
          <LoadingButton
            variant="contained"
            fullWidth
            loading={isLoading}
            type="submit">
            Submit
          </LoadingButton>
          <Box
            display="flex"
            justifyContent="space-between">
            <Button
              variant="text"
              onClick={() => {
                dispatch(logout());
                navigate("/login");
              }}>
              Logout
            </Button>
            <Button
              variant="text"
              onClick={handleResend}>
              Resend
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default VerifyPage;
