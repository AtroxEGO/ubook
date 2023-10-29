import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import image from "../assets/placeholder.png";
import moment from "moment";
import InfoIcon from "@mui/icons-material/Info";
import PlaceIcon from "@mui/icons-material/Place";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { unstable_HistoryRouter, useNavigate } from "react-router-dom";

const BookingCard = ({ booking }) => {
  const navigate = useNavigate();
  const getBookingStatus = () => {
    console.log(booking.timestamp);
    if (booking.accepted === 0) {
      return <span style={{ color: "yellow" }}>Pending Approval</span>;
    }
    if (moment(booking.timestamp).isBefore(moment.now())) {
      return <span style={{ color: "orange" }}>Ongoing</span>;
    }

    return <span style={{ color: "#00c41d" }}>Accepted</span>;
  };

  const getTimeBetweenNowAndBooking = () => {
    const currentTime = moment();
    const startTime = moment(booking.timestamp);

    const duration = moment.duration(currentTime.diff(startTime));

    const weeks = duration.asWeeks();
    const days = duration.asDays();
    const hours = duration.asHours();
    const minutes = duration.asMinutes();
    const seconds = duration.asSeconds();

    let formattedTimeDifference = "";

    if (weeks >= 1) {
      formattedTimeDifference = moment.duration(weeks, "weeks").humanize();
    } else if (days >= 1) {
      formattedTimeDifference = moment.duration(days, "days").humanize();
    } else if (hours >= 1) {
      formattedTimeDifference = moment.duration(hours, "hours").humanize();
    } else if (minutes >= 1) {
      formattedTimeDifference = moment.duration(minutes, "minutes").humanize();
    } else {
      formattedTimeDifference = moment.duration(seconds, "seconds").humanize();
    }

    const ending = startTime.isBefore(moment()) ? " ago." : " left.";

    return formattedTimeDifference + ending;
  };

  return (
    <Card
      onClick={() => {
        navigate("/service", { state: { serviceID: booking.id } });
      }}
      sx={{ maxWidth: 345, minWidth: "20em", marginInline: "0.5em" }}
      variant="outlined">
      <CardMedia
        component="img"
        height="170"
        image={image}
        alt="booking image"
      />
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
            <Typography>Time: {getTimeBetweenNowAndBooking()}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
