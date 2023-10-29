import {
  Box,
  Container,
  Divider,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetServiceByIDMutation } from "../services/api/apiSlice";
import { useDispatch } from "react-redux";
import { setSnack } from "../services/store/features/snackSlice";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BookServicePage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getServiceData] = useGetServiceByIDMutation();
  const [serviceData, setServiceData] = useState(null);
  useEffect(() => {
    getServiceData({ id: location.state.serviceID })
      .unwrap()
      .then((data) => {
        console.log(data);
        setServiceData(data);
      })
      .catch((error) => {
        dispatch(setSnack(error));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container
      component="main"
      maxWidth="md">
      <Box
        sx={{ mt: 8, mb: 4 }}
        display="flex"
        flexDirection="column"
        // alignItems="center"
      >
        <Box
          display="flex"
          alignItems="center"
          gap={1}>
          <IconButton onClick={() => navigate("/")}>
            <Tooltip title="Back">
              <ArrowBackIcon fontSize="large" />
            </Tooltip>
          </IconButton>
          <Typography variant="h5">{serviceData?.name}</Typography>
        </Box>
        <Box
          display="flex"
          gap={1}
          flexWrap="wrap"
          justifyContent="center"
          alignItems="flex-start"
          boxSizing="border-box">
          <Box
            display="flex"
            flexDirection="column"
            width="49%"
            minWidth="360px"
            height="100%"
            boxSizing="border-box">
            <Paper sx={{ overflow: "hidden" }}>
              <Box
                display="flex"
                height="100%"
                flexWrap="wrap"
                flexDirection="column"
                // borderRadius="inherit"
              >
                <Box
                  component="img"
                  sx={{
                    width: "100%",
                    // maxWidth: "400px",
                    // borderRadius: "inherit",
                  }}
                  alt="Service image"
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                />
                <Box padding={1}>
                  <Typography variant="body">
                    {serviceData?.description} {serviceData?.description}{" "}
                    {serviceData?.description} {serviceData?.description}{" "}
                    {serviceData?.description}
                  </Typography>
                </Box>
                <Divider />
                <Box
                  display="flex"
                  padding={2}
                  flexWrap="wrap"
                  justifyContent="flex-start"
                  alignContent="flex-start"
                  gap={1}>
                  <Box
                    display="flex"
                    gap={0.5}
                    height="fit-content"
                    // width="100%"
                  >
                    <AccessTimeRoundedIcon color="primary" />
                    <Typography variant="subtitle1">
                      Duration: {serviceData?.duration} mins
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    gap={0.5}
                    height="fit-content"
                    // width="100%"
                  >
                    <AttachMoneyRoundedIcon color="primary" />
                    <Typography variant="subtitle1">
                      Price:{" "}
                      {parseFloat(serviceData?.price)
                        .toFixed(2)
                        .replace(".", ",")}{" "}
                      zł
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    gap={0.5}
                    height="fit-content"
                    // width="100%"
                  >
                    <StarBorderRoundedIcon color="primary" />
                    <Typography variant="subtitle1">
                      Rating: {serviceData?.averageReview} (
                      {serviceData?.reviewCount} reviews)
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>
          <Box
            display="flex"
            boxSizing="border-box"
            flexDirection="column"
            width="49%"
            minWidth="360px"
            height="100%">
            <Paper>Book</Paper>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default BookServicePage;
