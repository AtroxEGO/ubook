const express = require("express");
const CorrectAccountType = require("../middlewares/CorrectAccountTypeMiddleware");
const {
  AddReview,
  RemoveReview,
  GetAverageReview,
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

// Remove a review
router.post("/getAvg", GetAverageReview);

module.exports = { ReviewsRouter: router };
