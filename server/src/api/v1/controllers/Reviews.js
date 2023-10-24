const Error = require("../helpers/Error");
const errorMessages = require("../helpers/ErrorMessages");
const Notification = require("../helpers/Notification");
const {
  InsertReview,
  DeleteReview,
  QueryAllReviewsForService,
} = require("../services/ReviewsTable");

// Add new service to user favorites
const AddReview = async (req, res) => {
  const userID = req.userData.id;
  const serviceID = req.body.serviceID;
  const review = req.body.review;

  try {
    await InsertReview({ serviceID, userID, review });
    res.json(Notification("Review was added!"));
  } catch (error) {
    res.status(400).json(error);
  }
};

// Add new service to user favorites
const RemoveReview = async (req, res) => {
  const userID = req.userData.id;
  const serviceID = req.body.serviceID;

  if (!serviceID) res.status(400).json(Error(errorMessages.missingData));

  try {
    await DeleteReview({ serviceID, userID });
    res.json(Notification("Review was deleted!"));
  } catch (error) {
    res.status(400).json(error);
  }
};

// Get average of reviews for a service
const GetAverageReview = async (req, res) => {
  const serviceID = req.body.serviceID;

  if (!serviceID) res.status(400).json(Error(errorMessages.missingData));

  try {
    const result = await QueryAllReviewsForService(serviceID);

    if (result.length < 1) return res.json({ average: 0, total: 0 });

    const sum = result.reduce((acc, currentValue) => acc + currentValue, 0);

    const avg = sum / result.length;

    res.json({ average: avg, total: result.length });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { AddReview, RemoveReview, GetAverageReview };
