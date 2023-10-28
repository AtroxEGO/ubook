import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setSnack } from "../services/store/features/snackSlice";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.accountReducer);
  const dispatch = useDispatch();
  if (!user.loggedIn) {
    dispatch(setSnack({ message: "Please log in!", type: "error" }));
    return (
      <Navigate
        to="/login"
        state={{ error: "Please log in!", path: "form" }}
      />
    );
  }
  if (user.accountData.verified === 0) {
    dispatch(setSnack({ message: "Verify your account!", type: "info" }));
    return <Navigate to="/verify" />;
  }

  return children;
};

export default ProtectedRoute;
