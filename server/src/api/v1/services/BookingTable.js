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
    `SELECT bookings.id, timestamp, bookings.service_id as serviceID, accepted, services.name, description, image_url, price, duration, subcategory_name, businesses.name as creator_name, avatar_url, address FROM bookings 
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
    // `SELECT * FROM bookings WHERE (SELECT services.created_by FROM services WHERE services.id = service_id) = ? AND DATE_ADD(timestamp, INTERVAL (SELECT duration FROM services WHERE services.id = bookings.service_id) MINUTE) > NOW();`,
    `SELECT bookings.id as event_id, CONCAT(users.first_name," ",users.last_name) as booker_full_name, TIMESTAMP(timestamp) as start, TIMESTAMP(DATE_ADD(timestamp, INTERVAL duration MINUTE)) as end, accepted, services.name as name, subcategory_name
    FROM bookings
    LEFT JOIN services ON bookings.service_id = services.id
    LEFT JOIN subcategories ON services.subcategory = subcategories.id
    LEFT JOIN businesses ON businesses.id = services.created_by
    LEFT JOIN users on users.id = bookings.user_id
    WHERE services.created_by = ? AND timestamp > NOW();`,
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

const QueryBookingsForGivenTimeFrameByCreatorID = async (
  creatorID,
  startTimestamp,
  endTimestamp
) => {
  const startDate = startTimestamp.format("YYYY-MM-DD");
  const endDate = endTimestamp.format("YYYY-MM-DD");

  const [res] = await pool.execute(
    `SELECT bookings.id as event_id, CONCAT(users.first_name," ",users.last_name) as booker_full_name, TIMESTAMP(timestamp) as start, TIMESTAMP(DATE_ADD(timestamp, INTERVAL duration MINUTE)) as end, accepted, services.name as title, subcategory_name
    FROM bookings
    LEFT JOIN services ON bookings.service_id = services.id
    LEFT JOIN subcategories ON services.subcategory = subcategories.id
    LEFT JOIN businesses ON businesses.id = services.created_by
    LEFT JOIN users on users.id = bookings.user_id
    WHERE services.created_by = ?
    AND bookings.timestamp BETWEEN DATE_SUB(?, INTERVAL 1 SECOND) AND DATE_ADD(?, INTERVAL 1 DAY);`,
    [creatorID, startDate, endDate]
  );
  return res;
};

const UpdateBookingAccepted = async (creatorID, bookingID) => {
  const [res] = await pool.execute(
    `UPDATE bookings SET accepted = 1 WHERE bookings.id = ? AND (SELECT services.created_by FROM services WHERE services.id = service_id) = ? AND DATE_SUB(timestamp, INTERVAL 10 MINUTE) > NOW();`,
    [bookingID, creatorID]
  );
  console.log(res);
  return res;
};

module.exports = {
  QueryAllBookingsForDay,
  QueryAllBookingsByServiceID,
  QueryUpcomingBookingsByServiceID,
  QueryAllBookingsByUserID,
  QueryUpcomingBookingsByUserID,
  UpdateBookingAccepted,
  QueryArchiveBookingsByOwnerID,
  InsertBookingForDay,
  QueryBookingByID,
  QueryArchiveBookingsByUserID,
  DeleteBookingByID,
  QueryAllBookingsByOwnerID,
  QueryUpcomingBookingsByOwnerID,
  DeleteBookingByUserAndBookingID,
  DeleteBookingByBusinessIDAndBookingID,
  QueryBookingsForGivenTimeFrameByCreatorID,
};
