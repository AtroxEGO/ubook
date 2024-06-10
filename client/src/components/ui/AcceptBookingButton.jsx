import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import DoneIcon from "@mui/icons-material/Done";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { useAcceptBookingMutation } from "../../services/api/apiSlice";
import { setSnack } from "../../services/store/features/snackSlice";

export const AcceptBookingButton = ({
  bookingID,
  onClick,
  setPendingBookings,
}) => {
  const dispatch = useDispatch();
  const [acceptBooking, { isLoading }] = useAcceptBookingMutation();

  const handleAccept = (e) => {
    if (onClick) {
      onClick(e);
    }
    acceptBooking({ bookingID: bookingID })
      .unwrap()
      .then((data) => {
        dispatch(setSnack(data));
        if (setPendingBookings) {
          setPendingBookings((prev) =>
            prev.filter((booking) => booking.event_id !== bookingID)
          );
        }
      })
      .catch((error) => {
        dispatch(setSnack(error));
      });
  };

  return (
    <IconButton
      onClick={handleAccept}
      disabled={isLoading}>
      <Tooltip title="Accept">
        {isLoading ? <CircularProgress /> : <DoneIcon />}
      </Tooltip>
    </IconButton>
  );
};
