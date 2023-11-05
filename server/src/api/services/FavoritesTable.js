const { pool } = require("../helpers/Database");
const errorMessages = require("../helpers/ErrorMessages");
const Error = require("../helpers/Error");

const InsertFavorite = async ({ userID, serviceID }) => {
  try {
    await pool.execute(
      "INSERT INTO favorites (user_id,service_id) VALUES (?,?)",
      [userID, serviceID]
    );
  } catch (error) {
    throw Error(errorMessages[error.code]);
  }
};

const DeleteFavorite = async ({ userID, serviceID }) => {
  const [res] = await pool.execute(
    "DELETE FROM favorites WHERE user_id = ? AND service_id = ?",
    [userID, serviceID]
  );
  if (res.affectedRows === 0) throw Error(errorMessages.doesntExist);
};

const QueryAllFavorites = async (userID) => {
  const [res] = await pool.execute(
    `SELECT favorites.service_id as serviceID, services.name, description, image_url, price, duration, gap, serviceHourStart, serviceHourEnd,subcategory_name, category_name, businesses.name as creator_name, address, avatar_url, ROUND(COALESCE(AVG(reviews.review), 0), 1) as averageReview, COUNT(reviews.review) as reviewCount
    FROM favorites 
    LEFT JOIN services on services.id = favorites.service_id
    LEFT JOIN subcategories on subcategories.id = services.subcategory
    LEFT JOIN categories on categories.id = subcategories.category_id
    LEFT JOIN businesses on businesses.id = services.created_by
    LEFT JOIN reviews ON reviews.service_id = favorites.service_id
    WHERE favorites.user_id = ?
    GROUP BY services.id, services.name, description, image_url, price, duration, gap, serviceHourStart, serviceHourEnd,subcategory_name, category_name, businesses.name, address, avatar_url,favorites.service_id;`,
    [userID]
  );
  return res;
};

module.exports = { InsertFavorite, DeleteFavorite, QueryAllFavorites };
