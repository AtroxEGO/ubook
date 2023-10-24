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
    "SELECT service_id FROM favorites WHERE user_id = ?",
    [userID]
  );
  return res.map((row) => row.service_id);
};

module.exports = { InsertFavorite, DeleteFavorite, QueryAllFavorites };
