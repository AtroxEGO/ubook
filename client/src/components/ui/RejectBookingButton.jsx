import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { useRemoveBookingMutation } from "../../services/api/apiSlice";
import { setSnack } from "../../services/store/features/snackSlice";

export const RejectBookingButton = ({
  bookingID,
  onClick,
  setPendingBookings,
}) => {
  const dispatch = useDispatch();
  const [rejectBooking, { isLoading: isRejecting }] =
    useRemoveBookingMutation();
  const handleReject = (e) => {
    if (onClick) {
      onClick(e);
    }
    rejectBooking({ bookingID: bookingID })
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
      onClick={handleReject}
      disabled={isRejecting}>
      <Tooltip title="Reject">
        {isRejecting ? <CircularProgress /> : <ClearIcon />}
      </Tooltip>
    </IconButton>
  );
};
