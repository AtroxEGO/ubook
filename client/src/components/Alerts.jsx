import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeSnack } from "../services/store/features/snackSlice";

const Alerts = () => {
  const dispatch = useDispatch();
  const snack = useSelector((state) => state.snackReducer);
  const handleSnackbarClose = () => {
    dispatch(removeSnack());
  };

  return (
    <Snackbar
      open={snack.open}
      autoHideDuration={4000}
      onClose={handleSnackbarClose}>
      <Alert severity={snack?.type}>{snack?.message}</Alert>
    </Snackbar>
  );
};

export default Alerts;
