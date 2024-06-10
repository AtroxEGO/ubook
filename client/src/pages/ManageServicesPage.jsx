import {
  Box,
  CircularProgress,
  Button,
  Typography,
  Container,
} from "@mui/material";
import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { useGetAllServicesByBusinessMutation } from "../services/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setSnack } from "../services/store/features/snackSlice";
import ServiceCard from "../components/ServiceCard";
import { useNavigate } from "react-router-dom";
import { setOwnedServices } from "../services/store/features/ownedServicesSlice";

const ManageServicesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ownedServices = useSelector(
    (state) => state.ownedServicesReducer.ownedServices
  );
  const [getAllOwnedServices, { isLoading }] =
    useGetAllServicesByBusinessMutation();

  useEffect(() => {
    getAllOwnedServices()
      .unwrap()
      .then((data) => {
        dispatch(setOwnedServices(data));
      })
      .catch((error) => {
        dispatch(setSnack(error));
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          ) : ownedServices.length < 1 ? (
            <Box
              display="flex"
              gap={1}
              flexDirection="column"
              alignItems="center"
              flexWrap="wrap">
              <Typography>Create Your First Service!</Typography>
              <Button
                variant="contained"
                onClick={() => navigate("/createService")}>
                Create
              </Button>
            </Box>
          ) : (
            ownedServices.map((ownedService) => (
              <ServiceCard
                key={ownedService.serviceID}
                service={ownedService}
              />
            ))
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ManageServicesPage;
