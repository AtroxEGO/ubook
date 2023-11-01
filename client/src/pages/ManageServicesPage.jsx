import { Box, CircularProgress, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { useGetAllServicesByBusinessMutation } from "../services/api/apiSlice";
import { useDispatch } from "react-redux";
import { setSnack } from "../services/store/features/snackSlice";
import ServiceCard from "../components/ServiceCard";

const ManageServicesPage = () => {
  const dispatch = useDispatch();
  const [services, setServices] = useState([]);
  const [getAllServices, { data, isLoading }] =
    useGetAllServicesByBusinessMutation();

  useEffect(() => {
    getAllServices()
      .unwrap()
      .then((res) => {
        setServices(res);
      })
      .catch((error) => {
        dispatch(setSnack(error));
        console.log(error);
      });
  }, []);

  return (
    <Container
      component="main"
      maxWidth="lg">
      <Box mt={4}>
        <Navbar title={"Manage Services"} />
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center">
          {isLoading ? (
            <CircularProgress />
          ) : services.length < 0 ? (
            <>None!</>
          ) : (
            services.map((service) => <ServiceCard service={service} />)
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ManageServicesPage;
