const { pool } = require("../helpers/Database");
const Error = require("../helpers/Error");
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

const QueryArchiveBookingsByUserID = async (userID) => {
  // `SELECT * FROM bookings WHERE user_id = ? AND DATE_ADD(timestamp, INTERVAL (SELECT duration FROM services WHERE services.id = bookings.service_id) MINUTE) < NOW();`,
  const [res] = await pool.execute(
    `SELECT bookings.id, timestamp, accepted, services.name, description, image_url, price, duration, subcategory_name, businesses.name as creator_name, avatar_url, address FROM bookings 
    LEFT JOIN services ON bookings.service_id = services.id
    LEFT JOIN subcategories ON services.subcategory = subcategories.id
    LEFT JOIN businesses ON businesses.id = services.created_by
    WHERE user_id = ? AND DATE_ADD(timestamp, INTERVAL (SELECT duration FROM services WHERE services.id = bookings.service_id) MINUTE) < NOW();`,
    [userID]
  );
  return res;
};

const QueryUpcomingBookingsByUserID = async (userID) => {
  // `SELECT * FROM bookings WHERE user_id = ? AND DATE_ADD(timestamp, INTERVAL (SELECT duration FROM services WHERE services.id = bookings.service_id) MINUTE) > NOW();`,
  const [res] = await pool.execute(
    `SELECT bookings.id, timestamp, accepted, services.name, description, image_url, price, duration, subcategory_name, businesses.name as creator_name, avatar_url, address FROM bookings 
    LEFT JOIN services ON bookings.service_id = services.id
    LEFT JOIN subcategories ON services.subcategory = subcategories.id
    LEFT JOIN businesses ON businesses.id = services.created_by
    WHERE user_id = ? AND DATE_ADD(timestamp, INTERVAL (SELECT duration FROM services WHERE services.id = bookings.service_id) MINUTE) > NOW();`,
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

const QueryArchiveBookingsByOwnerID = async (userID) => {
  const [res] = await pool.execute(
    `SELECT * FROM bookings WHERE (SELECT services.created_by FROM services WHERE services.id = service_id) = ? AND DATE_ADD(timestamp, INTERVAL (SELECT duration FROM services WHERE services.id = bookings.service_id) MINUTE) < NOW();`,
    [userID]
  );
  return res;
};

const QueryUpcomingBookingsByOwnerID = async (userID) => {
  const [res] = await pool.execute(
    `SELECT * FROM bookings WHERE (SELECT services.created_by FROM services WHERE services.id = service_id) = ? AND DATE_ADD(timestamp, INTERVAL (SELECT duration FROM services WHERE services.id = bookings.service_id) MINUTE) > NOW();`,
    [userID]
  );
  return res;
};

const InsertBookingForDay = async (userID, serviceID, date) => {
  try {
    const [res] = await pool.execute(
      `INSERT INTO bookings (user_id,service_id,timestamp) VALUES (?,?,?);`,
      [userID, serviceID, date]
    );
    return res;
  } catch (error) {
    throw Error(errorMessages[error.code]);
  }
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
  QueryArchiveBookingsByOwnerID,
  InsertBookingForDay,
  QueryBookingByID,
  QueryArchiveBookingsByUserID,
  DeleteBookingByID,
  QueryAllBookingsByOwnerID,
  QueryUpcomingBookingsByOwnerID,
  DeleteBookingByUserAndBookingID,
  DeleteBookingByBusinessIDAndBookingID,
};
