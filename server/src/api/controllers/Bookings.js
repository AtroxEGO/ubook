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
  UpdateBookingAccepted,
  QueryBookingByID,
} = require("../services/BookingTable");
const { QueryServiceById } = require("../services/ServicesTable");
const { getAvaiableHoursAsTimestamps } = require("../helpers/Booking");
const WebSocketServer = require("../helpers/WebSocketServer");

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

// Get upcoming bookings for user/business
const GetUpcomingBookings = async (req, res) => {
  const userID = req.userData.id;
  const accountType = req.userData.account;

  const upcomingBookings =
    accountType === "user"
      ? await QueryUpcomingBookingsByUserID(userID)
      : await QueryUpcomingBookingsByOwnerID(userID);
  res.json(upcomingBookings);
};

// Get archive bookings for user/business
const GetArchiveBookings = async (req, res) => {
  const userID = req.userData.id;
  const accountType = req.userData.account;

  const archiveBookings =
    accountType === "user"
      ? await QueryArchiveBookingsByUserID(userID)
      : await QueryArchiveBookingsByOwnerID(userID);
  res.json(archiveBookings);
};

// Remove booking by ID
const RemoveBookingByID = async (req, res) => {
  const userID = req.userData.id;
  const accountType = req.userData.account;
  const bookingID = req.body.bookingID;

  if (!bookingID) return res.status(400).json(Error(errorMessages.missingData));

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

// Accept booking proposed by user
const AcceptBookingByID = async (req, res) => {
  const userID = req.userData.id;
  const bookingID = req.body.bookingID;

  if (!bookingID) return res.status(400).json(Error(errorMessages.missingData));

  const result = await UpdateBookingAccepted(userID, bookingID);
  if (result.affectedRows === 0)
    return res
      .status(400)
      .json(Error(errorMessages.notAuthorizedOrDoesntExits));

  const booking = await QueryBookingByID(bookingID);

  WebSocketServer.sendNotification("user", booking.user_id, {
    title: "Your Booking Was Accepted!",
    body: `Your booking for ${
      booking.service_name
    } was accepted just now! See you ${moment(booking.timestamp).fromNow()}!`,
    type: "bookingAccepted",
  });

  res.json(Notification("Booking was accepted!"));
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
    const result = await InsertBookingForDay(
      req.userData.id,
      serviceID,
      timestamp.format()
    );
    WebSocketServer.sendNotification("business", service.created_by, {
      title: "New Booking!",
      body: "You have a new booking for: " + service.name,
      bookingID: result.insertId,
      type: "newBooking",
    });
  } catch (error) {
    res.status(400).json(error);
  }

  res.json(Notification("Successfully booked the service"));
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
  AcceptBookingByID,
  GetArchiveBookings,
  CreateNewBooking,
};
