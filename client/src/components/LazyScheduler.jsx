import React, { useEffect, useState } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import { useGetBookingsForTimeframeMutation } from "../services/api/apiSlice";
import { useDispatch } from "react-redux";
import { setSnack } from "../services/store/features/snackSlice";
import { Box, Typography } from "@mui/material";

const LazyScheduler = () => {
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();
  const [getBookings, { isLoading }] = useGetBookingsForTimeframeMutation();
  const [tableHours, setTableHours] = useState({ min: 6, max: 20 });

  useEffect(() => {
    if (events.length === 0) return;
    // Find the earliest and latest start times in the events array
    const earliestStart = events.reduce(
      (min, event) => (event.start < min ? event.start : min),
      events[0].start
    );
    const latestEnd = events.reduce(
      (max, event) => (event.end > max ? event.end : max),
      events[0].end
    );
    // Update the tableHours state with the new values
    setTableHours({
      min: earliestStart.getHours() < 8 ? earliestStart.getHours() : 8,
      max: latestEnd.getHours() > 16 ? latestEnd.getHours() : 16,
    });
  }, [events]);

  return (
    <Scheduler
      week={{ startHour: tableHours.min, endHour: tableHours.max }}
      day={{ startHour: tableHours.min, endHour: tableHours.max }}
      stickyNavigation
      editable={false}
      loading={isLoading}
      fields={{
        name: "description",
      }}
      viewerExtraComponent={(fields, event) => {
        return (
          <div>
            <p>Booker: {event.booker_full_name || "Nothing..."}</p>
            <p>Subcategory: {event.subcategory_name || "Nothing..."}</p>
          </div>
        );
      }}
      getRemoteEvents={({ start, end }) => {
        getBookings({ start: start, end: end })
          .unwrap()
          .then((data) => {
            const modifiedData = data.map((event) => {
              return {
                ...event,
                start: new Date(event.start),
                end: new Date(event.end),
                disabled: event.accepted === 0,
                deletable: false,
              };
            });
            console.log(modifiedData);
            setEvents(modifiedData);
          })
          .catch((error) => {
            dispatch(setSnack(error));
          });
      }}
      events={events}
      //   events={
      //     [
      //       // {
      //       //   event_id: 31,
      //       //   booker_full_name: "Paweł Polakiewicz",
      //       //   start: "2023-10-29T11:00:00.000Z",
      //       //   end: "2023-10-29T12:00:00.000Z",
      //       //   accepted: 1,
      //       //   name: "Service Name Example",
      //       //   subcategory_name: "Doctors' Appointments",
      //       // },
      //     ]
      //   }
    />
  );
};

export default LazyScheduler;
