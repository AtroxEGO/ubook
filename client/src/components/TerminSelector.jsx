import { Box, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookServiceMutation } from "../services/api/apiSlice";
import { useDispatch } from "react-redux";
import { setSnack } from "../services/store/features/snackSlice";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { DateCalendar } from "@mui/x-date-pickers";
import moment from "moment/moment";
import { LoadingButton } from "@mui/lab";
import { HourSelector } from "./ui/HourSelector";

export const TerminSelector = ({ serviceData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedHour, setSelectedHour] = useState();
  const [selectedDay, setSelectedDay] = useState(moment().format("YYYY-MM-DD"));

  const [bookService, { isLoading: bookActionLoading }] =
    useBookServiceMutation();

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
          />
          <HourSelector
            serviceID={serviceData?.serviceID}
            selectedDay={selectedDay}
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
              fullWidth
              loading={bookActionLoading}
              disabled={!selectedHour}
              onClick={handleBookService}
              variant="contained">
              book
            </LoadingButton>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
