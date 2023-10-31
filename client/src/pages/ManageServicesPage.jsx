import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { Navbar } from "../components/Navbar";
import { useSelector } from "react-redux";

const ManageServicesPage = () => {
  return (
    <Container
      component="main"
      maxWidth="lg">
      <Box mt={4}>
        <Navbar title={"Manage Services"} />
      </Box>
    </Container>
  );
};

export default ManageServicesPage;
