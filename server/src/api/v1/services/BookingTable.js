const { pool } = require("../helpers/Database");
const errorMessages = require("../helpers/ErrorMessages");

const QueryAllBookingsForDay = async (serviceID, date) => {
  const [res] = await pool.execute(
    `SELECT * FROM bookings WHERE service_id = ? AND DATE(timestamp) = ?;`,
    [serviceID, date]
  );
  return res;
};

const QueryAllBookingsByServiceID = async (serviceID) => {
  const [res] = await pool.execute(
    `SELECT * FROM bookings WHERE service_id = ?;`,
    [serviceID]
  );
  return res;
};

const QueryBookingByID = async (bookingID) => {
  const [res] = await pool.execute(`SELECT * FROM bookings WHERE id = ?;`, [
    bookingID,
  ]);
  return res;
};

const QueryUpcomingBookingsByServiceID = async (serviceID) => {
  const [res] = await pool.execute(
    `SELECT * FROM bookings WHERE service_id = ? AND timestamp > NOW();;`,
    [serviceID]
  );
  return res;
};

const QueryAllBookingsByUserID = async (userID) => {
  const [res] = await pool.execute(
    `SELECT * FROM bookings WHERE user_id = ?;`,
    [userID]
  );
  return res;
};

const QueryUpcomingBookingsByUserID = async (userID) => {
  const [res] = await pool.execute(
    `SELECT * FROM bookings WHERE user_id = ? AND timestamp > NOW();`,
    [userID]
  );
  return res;
};

const QueryAllBookingsByOwnerID = async (userID) => {
  const [res] = await pool.execute(
    `SELECT * FROM bookings WHERE (SELECT services.created_by FROM services WHERE services.id = service_id) = ?;`,
    [userID]
  );
  return res;
};

const QueryUpcomingBookingsByOwnerID = async (userID) => {
  const [res] = await pool.execute(
    `SELECT * FROM bookings WHERE (SELECT services.created_by FROM services WHERE services.id = service_id) = ? AND timestamp > NOW();`,
    [userID]
  );
  return res;
};

const InsertBookingForDay = async (userID, serviceID, date) => {
  const [res] = await pool.execute(
    `INSERT INTO bookings (user_id,service_id,timestamp) VALUES (?,?,?);`,
    [userID, serviceID, date]
  );
  return res;
};

const DeleteBookingByID = async (bookingID) => {
  const [res] = await pool.execute(`DELETE FROM bookings WHERE id = ?;`, [
    bookingID,
  ]);
  return res;
};

const DeleteBookingByUserAndBookingID = async (userID, bookingID) => {
  const [res] = await pool.execute(
    `DELETE FROM bookings WHERE user_id = ? AND id = ?;`,
    [userID, bookingID]
  );
  return res;
};

const DeleteBookingByBusinessIDAndBookingID = async (businessID, bookingID) => {
  const [res] = await pool.execute(
    `DELETE FROM bookings WHERE (SELECT services.created_by FROM services WHERE services.id = service_id) = ? and id = ?`,
    [businessID, bookingID]
  );
  return res;
};

module.exports = {
  QueryAllBookingsForDay,
  QueryAllBookingsByServiceID,
  QueryUpcomingBookingsByServiceID,
  QueryAllBookingsByUserID,
  QueryUpcomingBookingsByUserID,
  InsertBookingForDay,
  QueryBookingByID,
  DeleteBookingByID,
  QueryAllBookingsByOwnerID,
  QueryUpcomingBookingsByOwnerID,
  DeleteBookingByUserAndBookingID,
  DeleteBookingByBusinessIDAndBookingID,
};
