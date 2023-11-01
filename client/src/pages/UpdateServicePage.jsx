import { Box, Container, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import ServiceForm from "../components/ServiceForm";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSnack } from "../services/store/features/snackSlice";
import { useGetServiceByIDMutation } from "../services/api/apiSlice";

const UpdateServicePage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const serviceID = location.state?.serviceID;
  const [serviceData, setServceData] = React.useState();
  if (!serviceID) {
    dispatch(setSnack({ message: "Service ID not found", type: "error" }));
    navigate("/");
  }

  const [getService, { isLoading }] = useGetServiceByIDMutation();

  useEffect(() => {
    if (!serviceID) return;

    getService({ id: serviceID })
      .unwrap()
      .then((data) => {
        setServceData(data);
      })
      .catch((error) => {
        console.log(error);
        dispatch(setSnack(error));
      });
  }, [serviceID]);

  return (
    <Container
      component="main"
      maxWidth="lg">
      <Box
        mt={4}
        display="flex"
        flexDirection="column"
        alignItems="center">
        <Navbar title="Update Service" />
        {serviceData ? (
          <ServiceForm serviceData={serviceData} />
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Container>
  );
};

export default UpdateServicePage;
