import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setSnack } from "../services/store/features/snackSlice";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.accountReducer.loggedIn);
  console.log(user);
  const dispatch = useDispatch();
  if (!user) {
    dispatch(setSnack({ message: "Please log in!", type: "error" }));
    return (
      <Navigate
        to="/login"
        state={{ error: "Please log in!", path: "form" }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
