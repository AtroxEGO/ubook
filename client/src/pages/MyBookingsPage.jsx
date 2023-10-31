import { Box, Container, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetUpcomingBookingsMutation } from "../services/api/apiSlice";
import BookingCard from "../components/BookingCard";
import { Navbar } from "../components/Navbar";

const MyBookingsPage = () => {
  const [upcomingBookings, setUpcomingBookings] = useState();
  const [getUpcomingBookings, { isLoading }] = useGetUpcomingBookingsMutation();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      component="main"
      maxWidth="lg">
      <Box mt={8}>
        <Navbar title="Bookings" />
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={1}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              {upcomingBookings && upcomingBookings.length > 0 ? (
                upcomingBookings.map((booking) => {
                  return (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                    />
                  );
                })
              ) : (
                <>None!</>
              )}
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default MyBookingsPage;
