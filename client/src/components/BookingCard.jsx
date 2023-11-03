import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Tooltip,
  Typography,
  capitalize,
} from "@mui/material";
import React from "react";
import moment from "moment";
import InfoIcon from "@mui/icons-material/Info";
import PlaceIcon from "@mui/icons-material/Place";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AcceptBookingButton } from "./ui/AcceptBookingButton";
import { RejectBookingButton } from "./ui/RejectBookingButton";

const BookingCard = ({ booking, setPendingBookings }) => {
  const navigate = useNavigate();
  const accountType = useSelector(
    (state) => state.accountReducer.accountData.account
  );
  const getBookingStatus = () => {
    if (booking.accepted === 0) {
      return <span style={{ color: "yellow" }}>Pending Approval</span>;
    }
    if (moment(booking.timestamp).isBefore(moment.now())) {
      return <span style={{ color: "orange" }}>Ongoing</span>;
    }

    return <span style={{ color: "#00c41d" }}>Accepted</span>;
  };

  return (
    <Card
      onClick={() => {
        if (accountType === "user") {
          navigate("/service", { state: { serviceID: booking.serviceID } });
        }
      }}
      sx={{ maxWidth: 345, minWidth: "20em", marginInline: "0.5em" }}
      variant="outlined">
      <CardMedia
        component="img"
        height="170"
        image={booking.image_url}
        alt="booking image"
      />
      {accountType === "user" ? (
        <>
          <CardHeader
            avatar={
              <Tooltip title={booking.creator_name}>
                <Avatar src={booking.avatar_url} />
              </Tooltip>
            }
            title={booking.name}
            subheader={booking.subcategory_name}
            sx={{ pb: 0 }}
          />
          <CardContent>
            <Box>
              <Box
                display="flex"
                alignItems="center"
                gap={0.5}>
                <InfoIcon />
                <Typography>Status: {getBookingStatus()}</Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                gap={0.5}>
                <PlaceIcon />
                <Typography>Address: {booking.address}</Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                gap={0.5}>
                <HourglassTopIcon />
                <Typography>
                  Time: {moment(booking.timestamp).fromNow()}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader
            title={booking.name}
            subheader={booking.subcategory_name}
            sx={{ pb: 0 }}
          />
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 1, pb: 0 }}>
            <Box
              display="flex"
              gap={1}>
              <PersonIcon />
              <Typography>{booking.booker_full_name}</Typography>
            </Box>
            <Box
              display="flex"
              gap={1}>
              <CalendarMonthIcon />
              <Typography>
                {moment(booking.start).format("YYYY-MM-DD HH:mm")}
              </Typography>
            </Box>
            <Box
              display="flex"
              gap={1}>
              <HourglassTopIcon />
              <Typography>
                {capitalize(moment(booking.start).fromNow())}
              </Typography>
            </Box>
          </CardContent>
        </>
      )}
      {accountType === "business" ? (
        <CardActions
          disableSpacing
          sx={{ display: "flex", justifyContent: "space-between" }}>
          <RejectBookingButton
            bookingID={booking.event_id}
            setPendingBookings={setPendingBookings}
          />
          <AcceptBookingButton
            bookingID={booking.event_id}
            setPendingBookings={setPendingBookings}
          />
        </CardActions>
      ) : null}
    </Card>
  );
};

export default BookingCard;
