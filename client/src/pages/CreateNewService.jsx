import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { Navbar } from "../components/Navbar";
import { useSelector } from "react-redux";
import ServiceForm from "../components/ServiceForm";

const CreateNewService = () => {
  return (
    <Container
      component="main"
      maxWidth="lg">
      <Box
        mt={4}
        display="flex"
        flexDirection="column"
        alignItems="center">
        <Navbar title={"Create New Service"} />
        <ServiceForm />
      </Box>
    </Container>
  );
};

export default CreateNewService;
