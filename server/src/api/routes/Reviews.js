const express = require("express");
const CorrectAccountType = require("../middlewares/CorrectAccountTypeMiddleware");
const {
  AddReview,
  RemoveReview,
  GetAverageReview,
  GetReviewForServiceByUser,
} = require("../controllers/Reviews");
const validation = require("../middlewares/ValidationMiddleware");
const { ReviewAddSchema } = require("../validations/ReviewValidation");
const router = express.Router();

// Add a review
router.post(
  "/add",
  [CorrectAccountType("user"), validation(ReviewAddSchema)],
  AddReview
);

// Remove a review
router.post("/remove", [CorrectAccountType("user")], RemoveReview);

// Get average review for a service
router.post("/getAvg", GetAverageReview);

// Get review for a service by user
router.post(
  "/getReviewByUser",
  [CorrectAccountType("user")],
  GetReviewForServiceByUser
);

module.exports = { ReviewsRouter: router };
