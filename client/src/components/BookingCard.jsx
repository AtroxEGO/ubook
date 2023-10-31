import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import image from "../assets/placeholder.png";
import moment from "moment";
import InfoIcon from "@mui/icons-material/Info";
import PlaceIcon from "@mui/icons-material/Place";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useAcceptBookingMutation,
  useRemoveBookingMutation,
} from "../services/api/apiSlice";
import { setSnack } from "../services/store/features/snackSlice";

const BookingCard = ({ booking }) => {
  const dispatch = useDispatch();
  const [acceptBooking, { isLoading }] = useAcceptBookingMutation();
  const [rejectBooking, { isLoading: isRejecting }] =
    useRemoveBookingMutation();

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

  const getTimeBetweenNowAndBooking = () => {
    const currentTime = moment();
    const startTime = moment(booking.timestamp || booking.start);

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

  const handleAccept = () => {
    acceptBooking({ bookingID: booking.event_id })
      .unwrap()
      .then((data) => {
        dispatch(setSnack(data));
      })
      .catch((error) => {
        dispatch(setSnack(error));
      });
  };
  const handleReject = () => {
    rejectBooking({ bookingID: booking.event_id })
      .unwrap()
      .then((data) => {
        dispatch(setSnack(data));
      })
      .catch((error) => {
        dispatch(setSnack(error));
      });
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
        image={image}
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
                <Typography>Time: {getTimeBetweenNowAndBooking()}</Typography>
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
              <Typography>{getTimeBetweenNowAndBooking()}</Typography>
            </Box>
          </CardContent>
        </>
      )}
      {accountType === "business" ? (
        <CardActions
          disableSpacing
          sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            onClick={handleReject}
            disabled={isRejecting}>
            <Tooltip title="Reject">
              {isRejecting ? <CircularProgress /> : <ClearIcon />}
            </Tooltip>
          </IconButton>
          <IconButton
            onClick={handleAccept}
            disabled={isLoading}>
            <Tooltip title="Accept">
              {isLoading ? <CircularProgress /> : <DoneIcon />}
            </Tooltip>
          </IconButton>
        </CardActions>
      ) : null}
    </Card>
  );
};

export default BookingCard;
