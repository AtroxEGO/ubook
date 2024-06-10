import { Box, Chip, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetServiceHoursForDayMutation } from "../../services/api/apiSlice";
import { useDispatch } from "react-redux";
import { setSnack } from "../../services/store/features/snackSlice";
import moment from "moment/moment";

export const HourSelector = React.memo(
  ({ serviceID, selectedDay, onHourSelect }) => {
    const [getAvailableHours] = useGetServiceHoursForDayMutation();
    const dispatch = useDispatch();

    const [selectedHour, setSelectedHour] = useState();
    const [availableHours, setAvailableHours] = useState();

    const handleClick = (hour) => {
      setSelectedHour(hour);
      onHourSelect(hour);
    };

    useEffect(() => {
      if (serviceID) {
        getAvailableHours({
          serviceID: serviceID,
          date: selectedDay,
        })
          .unwrap()
          .then((data) => {
            setAvailableHours(data);
          })
          .catch((error) => {
            dispatch(setSnack(error));
          });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDay, serviceID]);

    return (
      <>
        {availableHours?.length > 0 ? (
          <Tabs
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "87%",
              ".MuiTabs-indicator": {
                bottom: 0,
                opacity: 0,
              },
            }}
            variant="scrollable"
            value={1}
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
  }
);
