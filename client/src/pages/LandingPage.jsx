import { Box, Container, Paper, Typography, capitalize } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useGetAllServicesQuery } from "../services/api/apiSlice";

const LandingPage = () => {
  const accountData = useSelector((state) => state.accountReducer.accountData);
  const { data, isLoading, error } = useGetAllServicesQuery();
  console.log(data, error);

  return (
    <Container maxWidth="xl">
      <Box mt={5}>
        <Typography variant="h4">{capitalize(accountData.account)}</Typography>
      </Box>
    </Container>
  );
};

export default LandingPage;
