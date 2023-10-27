const express = require("express");
const {
  GetAllBookings,
  GetUpcomingBookings,
  RemoveBookingByID,
  CreateNewBooking,
} = require("../controllers/Bookings");
const CorrectAccountType = require("../middlewares/CorrectAccountTypeMiddleware");
const router = express.Router();

// Add service to favorites (returns Notification)
router.post("/getUpcoming", GetUpcomingBookings);

// Get all bookings for user/business
router.post("/getAll", GetAllBookings);

// Create new booking
router.post("/new", [CorrectAccountType("user")], CreateNewBooking);

// Delete a booking by its ID
router.post("/delete", RemoveBookingByID);

module.exports = { BookingsRouter: router };
