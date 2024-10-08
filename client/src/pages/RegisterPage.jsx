import { Container } from "@mui/material";
import React from "react";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  return (
    <Container
      component="main"
      maxWidth="xs">
      <RegisterForm />
    </Container>
  );
};

export default RegisterPage;
