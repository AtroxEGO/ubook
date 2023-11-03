import { Backdrop, Box, CircularProgress, Container } from "@mui/material";
import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { useDispatch } from "react-redux";
import { useGetUpcomingBookingsMutation } from "../services/api/apiSlice";
import { setSnack } from "../services/store/features/snackSlice";
import BookingCard from "../components/BookingCard";

const BookingsPendingApproval = () => {
  const [getBookings, { isLoading }] = useGetUpcomingBookingsMutation();
  const [pendingBookings, setPendingBookings] = React.useState([]);
  const dispatch = useDispatch();

  // const onAccept = useCallback()

  useEffect(() => {
    getBookings()
      .unwrap()
      .then((bookings) => {
        const pendingBookings = bookings.filter(
          (booking) => booking.accepted === 0
        );

        setPendingBookings(pendingBookings);
      })
      .catch((error) => {
        console.log(error);
        dispatch(setSnack(error));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      component="main"
      maxWidth="lg">
      <Box mt={4}>
        <Navbar title={"Pending"} />
        <Box
          display="flex"
          flexWrap="wrap"
          gap={1}>
          {pendingBookings.length > 0 ? (
            pendingBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                setPendingBookings={setPendingBookings}
              />
            ))
          ) : (
            <Box
              width="100%"
              textAlign="center">
              None!
            </Box>
          )}
        </Box>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default BookingsPendingApproval;
