import React, { useEffect, useState } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import { useGetBookingsForTimeframeMutation } from "../services/api/apiSlice";
import { useDispatch } from "react-redux";
import { setSnack } from "../services/store/features/snackSlice";

const LazyScheduler = () => {
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();
  const [getBookings, { isLoading }] = useGetBookingsForTimeframeMutation();
  const [tableHours, setTableHours] = useState({ min: 6, max: 20 });

  useEffect(() => {
    if (events.length === 0) {
      setTableHours({ min: 8, max: 16 });
      return;
    }
    // Find the earliest and latest start times in the events array
    const earliestStart = events.reduce(
      (min, event) =>
        event.start.getHours() < min ? event.end.getHours() : min,
      events[0].start.getHours()
    );

    const latestEnd = events.reduce(
      (max, event) => (event.end.getHours() > max ? event.end.getHours() : max),
      events[0].end.getHours()
    );

    // Update the tableHours state with the new values
    setTableHours({
      min: earliestStart <= 6 ? earliestStart - 1 : 6,
      max: latestEnd >= 16 ? latestEnd + 1 : 15,
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
