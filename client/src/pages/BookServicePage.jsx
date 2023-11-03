import {
  Box,
  Container,
  Divider,
  IconButton,
  Paper,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetServiceByIDMutation } from "../services/api/apiSlice";
import { useDispatch } from "react-redux";
import { setSnack } from "../services/store/features/snackSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TerminSelector } from "../components/TerminSelector";
import { BookingPageServiceInfo } from "../components/BookingPageServiceInfo";

const BookServicePage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [getServiceData] = useGetServiceByIDMutation();

  const [serviceData, setServiceData] = useState();

  const serviceID = location.state?.serviceID;
  if (!serviceID) navigate("/");

  useEffect(() => {
    getServiceData({ id: serviceID })
      .unwrap()
      .then((data) => {
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
          justifyContent="space-between">
          <Box
            display="flex"
            alignItems="center"
            gap={1}>
            <IconButton onClick={() => navigate(-1)}>
              <Tooltip title="Back">
                <ArrowBackIcon fontSize="large" />
              </Tooltip>
            </IconButton>
            <Typography variant="h5">
              {!serviceData ? <Skeleton width={300} /> : serviceData.name}
            </Typography>
          </Box>
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
                  src={serviceData?.image_url}
                />
                <Box padding={2}>
                  <Typography variant="body">
                    {!serviceData ? (
                      <Skeleton
                        height={130}
                        variant="rounded"
                      />
                    ) : (
                      serviceData.description
                    )}
                  </Typography>
                </Box>
                <Divider />
                <BookingPageServiceInfo serviceData={serviceData} />
              </Box>
            </Paper>
          </Box>
          <TerminSelector serviceData={serviceData} />
        </Box>
      </Box>
    </Container>
  );
};

export default BookServicePage;
