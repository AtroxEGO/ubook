import { Container } from "@mui/material";
import React from "react";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <Container
      component="main"
      maxWidth="xs">
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
