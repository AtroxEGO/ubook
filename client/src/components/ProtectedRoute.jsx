import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setSnack } from "../services/store/features/snackSlice";

const ProtectedRoute = ({ accountType, children }) => {
  const account = useSelector((state) => state.accountReducer);
  const dispatch = useDispatch();

  if (!account.loggedIn) {
    dispatch(setSnack({ message: "Please log in!", type: "error" }));
    return (
      <Navigate
        to="/login"
        state={{ error: "Please log in!", path: "form" }}
      />
    );
  }
  if (account.accountData.verified === 0) {
    dispatch(setSnack({ message: "Verify your account!", type: "info" }));
    return <Navigate to="/verify" />;
  }

  if (accountType && accountType !== account.accountData.account) {
    dispatch(setSnack({ message: "You are not authorized!", type: "error" }));
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
