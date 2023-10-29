import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  IconButton,
  Paper,
  Rating,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useAddReviewMutation,
  useBookServiceMutation,
  useGetReviewByUserMutation,
  useGetServiceByIDMutation,
  useGetServiceHoursForDayMutation,
  useRemoveReviewMutation,
} from "../services/api/apiSlice";
import { useDispatch } from "react-redux";
import { setSnack } from "../services/store/features/snackSlice";
import PlaceIcon from "@mui/icons-material/Place";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DateCalendar } from "@mui/x-date-pickers";
import moment from "moment/moment";
import { LoadingButton } from "@mui/lab";

const BookServicePage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [reviewValue, setReviewValue] = useState(0);
  const [getServiceData] = useGetServiceByIDMutation();
  const [addReview] = useAddReviewMutation();
  const [removeReview] = useRemoveReviewMutation();
  const [getReviewByUser] = useGetReviewByUserMutation();
  const [getAvailableHours] = useGetServiceHoursForDayMutation();
  const [bookService, { isLoading: bookActionLoading }] =
    useBookServiceMutation();
  const [serviceData, setServiceData] = useState();
  const [selectedDay, setSelectedDay] = useState(moment().format("YYYY-MM-DD"));
  const [availableHours, setAvailableHours] = useState();
  const [selectedHour, setSelectedHour] = useState();
  console.log(serviceData);
  useEffect(() => {
    getAvailableHours({
      serviceID: location.state.serviceID,
      date: selectedDay,
    })
      .unwrap()
      .then((data) => {
        console.log(data);
        setAvailableHours(data);
      })
      .catch((error) => {
        dispatch(setSnack(error));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDay]);

  useEffect(() => {
    getServiceData({ id: location.state.serviceID })
      .unwrap()
      .then((data) => {
        setServiceData(data);
      })
      .catch((error) => {
        dispatch(setSnack(error));
      });

    getReviewByUser({ serviceID: location.state.serviceID })
      .unwrap()
      .then((data) => {
        console.log(data.review);
        setReviewValue(data.review);
      })
      .catch((error) => {
        dispatch(setSnack(error));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRatingChange = (newValue) => {
    setReviewValue(newValue);
    if (newValue === null) {
      removeReview({
        serviceID: location.state.serviceID,
      })
        .unwrap()
        .then((data) => {
          dispatch(setSnack(data));
        })
        .catch((error) => {
          dispatch(setSnack(error));
        });
    } else {
      addReview({
        serviceID: location.state.serviceID,
        review: newValue,
      })
        .unwrap()
        .then((data) => {
          dispatch(setSnack(data));
        })
        .catch((error) => {
          dispatch(setSnack(error));
        });
    }
    console.log(newValue);
  };

  const handleBookService = () => {
    bookService({
      serviceID: serviceData.serviceID,
      timestamp: selectedHour.startTime,
    })
      .unwrap()
      .then((data) => {
        dispatch(setSnack(data));
        navigate("/myBookings");
      })
      .catch((error) => {
        dispatch(setSnack(error));
      });
  };

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
            <Typography variant="h5">{serviceData?.name}</Typography>
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
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                />
                <Box padding={2}>
                  <Typography variant="body">
                    {serviceData?.description} {serviceData?.description}{" "}
                    {serviceData?.description} {serviceData?.description}{" "}
                    {serviceData?.description}
                  </Typography>
                </Box>
                <Divider />
                <Box
                  display="flex"
                  padding={2}
                  flexWrap="wrap"
                  justifyContent="flex-start"
                  alignContent="flex-start"
                  gap={1}>
                  <Box
                    display="flex"
                    gap={0.5}
                    height="fit-content"
                    // width="100%"
                  >
                    <AccessTimeRoundedIcon color="primary" />
                    <Typography variant="subtitle1">
                      Duration: {serviceData?.duration} mins
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    gap={0.5}
                    height="fit-content"
                    // width="100%"
                  >
                    <AttachMoneyRoundedIcon color="primary" />
                    <Typography variant="subtitle1">
                      Price:{" "}
                      {parseFloat(serviceData?.price)
                        .toFixed(2)
                        .replace(".", ",")}{" "}
                      zł
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    gap={0.5}
                    height="fit-content"
                    // width="100%"
                  >
                    <StarBorderRoundedIcon color="primary" />
                    <Typography variant="subtitle1">
                      Rating: {serviceData?.averageReview} (
                      {serviceData?.reviewCount} reviews)
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    gap={0.5}
                    height="fit-content"
                    // width="100%"
                  >
                    <PlaceIcon color="primary" />
                    <Typography variant="subtitle1">
                      Address: {serviceData?.address}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    width="100%">
                    <Rating
                      value={reviewValue}
                      onChange={(_, newValue) => {
                        handleRatingChange(newValue);
                      }}
                      name="ratingInput"
                    />
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>
          <Box
            display="flex"
            boxSizing="border-box"
            flexDirection="column"
            width="49%"
            minWidth="360px"
            height="100%">
            <Paper>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                pb={2}>
                <DateCalendar
                  sx={{ height: "18em" }}
                  onChange={(data) => {
                    setSelectedDay(data.format("YYYY-MM-DD"));
                    setSelectedHour();
                  }}
                  views={["day"]}
                  showDaysOutsideCurrentMonth
                  disablePast={true}
                  // fixedWeekNumber={6}
                />
                <HourSelector
                  availableHours={availableHours}
                  onHourSelect={setSelectedHour}
                />
                <Box
                  width="67%"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  mt={2}
                  gap={1}
                  justifyContent="space-between">
                  {selectedHour ? (
                    <Box
                      display="flex"
                      width="100%"
                      justifyContent="space-between">
                      <Box
                        display="flex"
                        alignItems="center"
                        gap={0.5}>
                        <AccessTimeRoundedIcon color="primary" />
                        <Typography>
                          {moment(selectedHour?.startTime).format("HH:mm")} -{" "}
                          {moment(selectedHour?.endTime).format("HH:mm")}
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        gap={0.5}>
                        <CalendarTodayIcon color="primary" />
                        <Typography>
                          {moment(selectedHour?.startTime).format("YYYY-MM-DD")}
                        </Typography>
                      </Box>
                    </Box>
                  ) : null}

                  <LoadingButton
                    loading={bookActionLoading}
                    disabled={!selectedHour}
                    onClick={handleBookService}
                    fullWidth
                    variant="contained">
                    book
                  </LoadingButton>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

const HourSelector = React.memo(({ availableHours, onHourSelect }) => {
  const [selectedHour, setSelectedHour] = useState();
  const handleClick = (hour) => {
    setSelectedHour(hour);
    onHourSelect(hour);
  };
  return (
    <>
      {availableHours?.length > 0 ? (
        <Tabs
          sx={{ display: "flex", alignItems: "center", width: "87%" }}
          variant="scrollable"
          scrollButtons>
          {availableHours?.map((hour, index) => (
            <Chip
              sx={{ marginInline: 0.5 }}
              key={index}
              color="primary"
              variant={selectedHour === hour ? "default" : "outlined"}
              label={moment(hour.startTime).format("HH:mm")}
              onClick={() => handleClick(hour)}
            />
          ))}
        </Tabs>
      ) : (
        <Box marginBlock={0.5}>None available</Box>
      )}
    </>
  );
});

export default BookServicePage;
