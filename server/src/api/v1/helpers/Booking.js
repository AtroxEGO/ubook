const moment = require("moment");
const { QueryAllBookingsForDay } = require("../services/BookingTable");

const getAvaiableHoursAsTimestamps = async (service, date) => {
  const serviceHoursAvailable = generateAvailableHours(service);
  const activeBookingsForThisDay = await QueryAllBookingsForDay(
    service.serviceID,
    date.format("YYYY-MM-DD")
  );

  for (let i = 0; i < serviceHoursAvailable.length; i++) {
    serviceHoursAvailable[i] = convertHoursToTimestamp(
      serviceHoursAvailable[i],
      date
    );
  }

  const serviceHoursAfterNow = serviceHoursAvailable.filter((item) => {
    const startTime = item.startTime.format();
    return moment(startTime).isAfter(moment.now());
  });

  const filteredArray = serviceHoursAfterNow.filter((item) => {
    const startTime = item.startTime.format(); // Convert to a string for comparison

    return !activeBookingsForThisDay.some((secondItem) => {
      return startTime === moment(secondItem.timestamp).format();
    });
  });
  return filteredArray;
};

const generateAvailableHours = (service) => {
  const serviceHoursAvailable = [];

  const startHour = moment(service.serviceHourStart, "HH:mm");
  const duration = moment.duration(service.duration, "minutes");
  const endHour = moment(service.serviceHourEnd, "HH:mm").subtract(duration);
  let gap = 0;

  while (startHour.add(gap).isBefore(endHour)) {
    gap = moment.duration(service.gap, "minutes");
    const startTime = moment(startHour);
    const endTime = moment(startHour.add(duration));

    serviceHoursAvailable.push({
      startHour: startTime.hour() + startTime.minute() / 60,
      endHour: endTime.hour() + endTime.minute() / 60,
    });
  }
  return serviceHoursAvailable;
};

const convertHoursToTimestamp = (hours, date) => {
  const currentDay = date; // Current date and time
  const startHour = Math.floor(hours.startHour); // Get the integer part of the start hour
  const startMinute = (hours.startHour - startHour) * 60; // Calculate minutes

  const endHour = Math.floor(hours.endHour); // Get the integer part of the end hour
  const endMinute = (hours.endHour - endHour) * 60; // Calculate minutes

  const startTime = moment(currentDay);
  startTime.hour(startHour);
  startTime.minute(startMinute);
  startTime.second(0);

  const endTime = moment(currentDay);
  endTime.hour(endHour);
  endTime.minute(endMinute);
  endTime.second(0);

  return { startTime, endTime };
};

module.exports = {
  convertHoursToTimestamp,
  generateAvailableHours,
  getAvaiableHoursAsTimestamps,
};
