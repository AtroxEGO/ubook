const { pool } = require("../helpers/Database");
const Error = require("../helpers/Error");
const errorMessages = require("../helpers/ErrorMessages");

const InsertReview = async ({ serviceID, userID, review }) => {
  try {
    await pool.execute(
      "INSERT INTO reviews (service_id, user_id, review) VALUES (?,?,?) ON DUPLICATE KEY UPDATE review = ?",
      [serviceID, userID, review, review]
    );
  } catch (error) {
    throw Error(error.code);
  }
};

const DeleteReview = async ({ serviceID, userID }) => {
  try {
    await pool.execute(
      "DELETE FROM reviews WHERE service_id = ? AND user_id = ?",
      [serviceID, userID]
    );
  } catch (error) {
    throw Error(error.code);
  }
};

const QueryAllReviewsForService = async (serviceID) => {
  try {
    const [res] = await pool.execute(
      "SELECT review FROM reviews WHERE service_id = ?",
      [serviceID]
    );
    return res.map((row) => row.review);
  } catch (error) {
    throw Error(error.code);
  }
};

module.exports = { InsertReview, DeleteReview, QueryAllReviewsForService };
