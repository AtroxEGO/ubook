const express = require("express");
const {
  GetAllBookings,
  GetUpcomingBookings,
  RemoveBookingByID,
  CreateNewBooking,
  GetArchiveBookings,
  GetBookingsForTimeframeByCreatorID,
} = require("../controllers/Bookings");
const CorrectAccountType = require("../middlewares/CorrectAccountTypeMiddleware");
const router = express.Router();

// Get upcoming bookings for user/business
router.post("/getUpcoming", GetUpcomingBookings);

// Get all bookings for user/business
router.post("/getAll", GetAllBookings);

// Get bookings for business for a timeframe
router.post(
  "/getForTimeframe",
  [CorrectAccountType("business")],
  GetBookingsForTimeframeByCreatorID
);

// Get archive bookings for user/business
router.post("/getArchive", GetArchiveBookings);

// Create new booking
router.post("/new", [CorrectAccountType("user")], CreateNewBooking);

// Delete a booking by its ID
router.post("/delete", RemoveBookingByID);

module.exports = { BookingsRouter: router };
