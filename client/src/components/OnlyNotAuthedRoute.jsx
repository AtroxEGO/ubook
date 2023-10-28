import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const OnlyNotAuthedRoute = ({ verify, children }) => {
  const user = useSelector((state) => state.accountReducer);

  if (user.loggedIn && !verify) {
    return <Navigate to="/" />;
  } else if (user.loggedIn && verify) {
    if (user.accountData.verified === 1) {
      return <Navigate to="/" />;
    }
  }

  return children;
};

export default OnlyNotAuthedRoute;
