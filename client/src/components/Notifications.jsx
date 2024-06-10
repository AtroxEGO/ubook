import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { socket } from "../services/WebSocket";
import { RejectBookingButton } from "./ui/RejectBookingButton";
import { AcceptBookingButton } from "./ui/AcceptBookingButton";

const Notifications = () => {
  const [notification, setNotification] = useState({});
  const [open, setOpen] = useState(false);

  const handleNotification = (data) => {
    console.log(data);
    setNotification(data);
    setOpen(true);
  };

  socket.on("notification", handleNotification);

  return open ? (
    <Box
      position="fixed"
      bottom={0}
      width="100%"
      height="100%"
      maxWidth="20em"
      maxHeight="7em"
      mr={1}
      mb={1}
      zIndex={2}
      right={1}>
      <Paper
        elevation={2}
        sx={{ height: "100%", width: "100%" }}>
        <Box
          padding={1}
          height="100%"
          width="100%"
          position="absolute"
          display="flex"
          flexDirection="column"
          justifyContent="space-between">
          <Box paddingInline={1}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center">
              <Typography variant="body1">{notification.title}</Typography>
              <Tooltip title="Close">
                <IconButton onClick={() => setOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Typography variant="body2">{notification.body}</Typography>
          </Box>
          {notification.type === "newBooking" ? (
            <Box
              position="relative"
              bottom={0}
              display="flex"
              justifyContent="space-between">
              <RejectBookingButton
                bookingID={notification.bookingID}
                onClick={() => {
                  setOpen(false);
                }}
              />
              <AcceptBookingButton
                bookingID={notification.bookingID}
                onClick={() => {
                  setOpen(false);
                }}
              />
            </Box>
          ) : null}
        </Box>
      </Paper>
    </Box>
  ) : null;
};

export default Notifications;
