const Error = require("../helpers/Error");
const errorMessages = require("../helpers/ErrorMessages");
const Notification = require("../helpers/Notification");
const {
  QueryAllBookingsByUserID,
  QueryAllBookingsByServiceID,
  QueryAllBookingsByOwnerID,
  QueryUpcomingBookingsByUserID,
  QueryUpcomingBookingsByOwnerID,
  DeleteBookingByUserAndBookingID,
  DeleteBookingByBusinessIDAndBookingID,
} = require("../services/BookingTable");

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

  const allBookings =
    accountType === "user"
      ? await QueryUpcomingBookingsByUserID(userID)
      : await QueryUpcomingBookingsByOwnerID(userID);
  res.json(allBookings);
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
  console.log(result);
  if (result.affectedRows === 0)
    return res
      .status(400)
      .json(Error(errorMessages.notAuthorizedOrDoesntExits));

  res.json(Notification("Booking was deleted!"));
};

const CreateNewBooking = async (req, res) => {
  res.json("Ok");
};

module.exports = {
  GetAllBookings,
  GetUpcomingBookings,
  RemoveBookingByID,
  CreateNewBooking,
};
