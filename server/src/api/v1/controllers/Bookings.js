const Error = require("../helpers/Error");
const errorMessages = require("../helpers/ErrorMessages");
const Notification = require("../helpers/Notification");
const moment = require("moment");
const {
  QueryAllBookingsByUserID,
  QueryAllBookingsByServiceID,
  QueryAllBookingsByOwnerID,
  QueryUpcomingBookingsByUserID,
  QueryUpcomingBookingsByOwnerID,
  DeleteBookingByUserAndBookingID,
  DeleteBookingByBusinessIDAndBookingID,
  InsertBookingForDay,
  QueryArchiveBookingsByUserID,
  QueryArchiveBookingsByOwnerID,
  QueryBookingsForGivenTimeFrameByCreatorID,
} = require("../services/BookingTable");
const { QueryServiceById } = require("../services/ServicesTable");
const { getAvaiableHoursAsTimestamps } = require("../helpers/Booking");

// Get all bookings for user/business
const GetAllBookings = async (req, res) => {
  const userID = req.userData.id;
  const accountType = req.userData.account;

  const allBookings =
    accountType === "user"
      ? await QueryAllBookingsByUserID(userID)
      : await QueryAllBookingsByOwnerID(userID);
  res.json(allBookings);
};

// Get all bookings for user/business
const GetUpcomingBookings = async (req, res) => {
  const userID = req.userData.id;
  const accountType = req.userData.account;

  const upcomingBookings =
    accountType === "user"
      ? await QueryUpcomingBookingsByUserID(userID)
      : await QueryUpcomingBookingsByOwnerID(userID);
  res.json(upcomingBookings);
};

// Get all bookings for user/business
const GetArchiveBookings = async (req, res) => {
  const userID = req.userData.id;
  const accountType = req.userData.account;

  const archiveBookings =
    accountType === "user"
      ? await QueryArchiveBookingsByUserID(userID)
      : await QueryArchiveBookingsByOwnerID(userID);
  res.json(archiveBookings);
};

// Get all bookings for user/business
const RemoveBookingByID = async (req, res) => {
  const userID = req.userData.id;
  const accountType = req.userData.account;
  const bookingID = req.body.bookingID;

  const result =
    accountType === "user"
      ? await DeleteBookingByUserAndBookingID(userID, bookingID)
      : await DeleteBookingByBusinessIDAndBookingID(userID, bookingID);
  if (result.affectedRows === 0)
    return res
      .status(400)
      .json(Error(errorMessages.notAuthorizedOrDoesntExits));

  res.json(Notification("Booking was deleted!"));
};

const CreateNewBooking = async (req, res) => {
  const serviceID = req.body.serviceID;
  const timestamp = moment(req.body.timestamp);

  if (!timestamp.isValid() || timestamp.isBefore(moment.now()))
    return res.status(400).json(Error(errorMessages.invalidData));

  if (!serviceID || !timestamp)
    return res.status(400).json(Error(errorMessages.missingData));

  const service = await QueryServiceById(serviceID);
  if (!service) return res.status(400).json(Error(errorMessages.doesntExist));

  const availableHours = await getAvaiableHoursAsTimestamps(service, timestamp);

  const includesTargetStartTime = availableHours.some((item) =>
    item.startTime.isSame(timestamp)
  );
  if (!includesTargetStartTime)
    return res.status(400).json(Error(errorMessages.invalidData));
  try {
    await InsertBookingForDay(req.userData.id, serviceID, timestamp.format());
    res.json(Notification("Successfully booked the service"));
  } catch (error) {
    res.status(400).json(error);
  }
};

const GetBookingsForTimeframeByCreatorID = async (req, res) => {
  const creatorID = req.userData.id;
  const startTimestamp = req.body.start ? moment(req.body.start) : null;
  const endTimestamp = req.body.end ? moment(req.body.end) : null;

  if (!startTimestamp || !endTimestamp)
    return res.status(400).json(Error(errorMessages.missingData));

  const bookings = await QueryBookingsForGivenTimeFrameByCreatorID(
    creatorID,
    startTimestamp,
    endTimestamp
  );
  res.json(bookings);
};

module.exports = {
  GetAllBookings,
  GetUpcomingBookings,
  GetBookingsForTimeframeByCreatorID,
  RemoveBookingByID,
  GetArchiveBookings,
  CreateNewBooking,
};
