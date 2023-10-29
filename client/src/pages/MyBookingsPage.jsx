import { Box, Container, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetUpcomingBookingsMutation } from "../services/api/apiSlice";
import BookingCard from "../components/BookingCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const MyBookingsPage = () => {
  const [upcomingBookings, setUpcomingBookings] = useState();
  const [getUpcomingBookings] = useGetUpcomingBookingsMutation();
  const navigate = useNavigate();

  useEffect(() => {
    getUpcomingBookings()
      .unwrap()
      .then((data) => {
        console.log(data);

        const sortedData = [...data].slice().sort((a, b) => {
          const timestampA = new Date(a.timestamp);
          const timestampB = new Date(b.timestamp);
          return timestampA - timestampB;
        });
        setUpcomingBookings(sortedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container
      component="main"
      maxWidth="lg">
      <Box mt={8}>
        <Box
          display="flex"
          alignItems="center">
          <IconButton onClick={() => navigate(-1)}>
            <Tooltip title="Back">
              <ArrowBackIcon fontSize="large" />
            </Tooltip>
          </IconButton>
          <Typography
            component="h1"
            variant="h5">
            Bookings
          </Typography>
        </Box>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={1}>
          {upcomingBookings &&
            upcomingBookings.map((booking) => {
              return (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                />
              );
            })}
        </Box>
      </Box>
    </Container>
  );
};

export default MyBookingsPage;
