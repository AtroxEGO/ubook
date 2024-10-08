import { Box, Container } from "@mui/material";
import React from "react";
import { Navbar } from "../components/Navbar";
import ServiceForm from "../components/ServiceForm";

const CreateServicePage = () => {
  return (
    <Container
      component="main"
      maxWidth="lg">
      <Box
        mt={4}
        display="flex"
        flexDirection="column"
        alignItems="center">
        <Navbar title="Create Service" />
        <ServiceForm />
      </Box>
    </Container>
  );
};

export default CreateServicePage;
