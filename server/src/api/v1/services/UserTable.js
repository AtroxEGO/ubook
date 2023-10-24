const { pool } = require("../helpers/Database");
const errorMessages = require("../helpers/ErrorMessages");

const CheckIfRecordExists = async (table, param, value) => {
  // Count occurences of given email
  const [[res]] = await pool.execute(
    `SELECT COUNT(*) as COUNT FROM ${table} WHERE ${param} = ?;`,
    [value]
  );
  return res["COUNT"] >= 1;
};

const InsertUser = async (userData) => {
  const [res] = await pool.execute(
    "INSERT INTO users VALUES (null,?,?,?,?,?,?,false)",
    Object.values(userData)
  );
  if (res.insertId) {
    return res.insertId;
  } else {
    return errorMessages.internalError;
  }
};

const QueryUserDataFromID = async (userID) => {
  const [[res]] = await pool.execute(
    `SELECT *
     FROM USERS WHERE id = ?;
    `,
    [userID]
  );
  return res;
};

const QueryUserDataFromEmail = async (userEmail) => {
  const [[res]] = await pool.execute(
    `SELECT *
     FROM USERS WHERE email = ?;
    `,
    [userEmail]
  );
  return res;
};

const QueryUserTokenData = async (userID) => {
  const [[res]] = await pool.execute(
    `SELECT id, email, first_name, last_name, avatar_url, allows_marketing, verified 
     FROM USERS WHERE id = ?;
    `,
    [userID]
  );
  return res;
};

const QueryUserVerificationEmailData = async (userID) => {
  const [[res]] = await pool.execute(
    `SELECT email, first_name
     FROM USERS WHERE id = ?;
    `,
    [userID]
  );
  return res;
};

const UpdateUserVerified = async (userID) => {
  const [res] = await pool.execute(
    "UPDATE users SET verified = 1 WHERE id = ?",
    [userID]
  );
  return res;
};

module.exports = {
  InsertUser,
  CheckIfRecordExists,
  QueryUserTokenData,
  QueryUserVerificationEmailData,
  QueryUserDataFromEmail,
  QueryUserDataFromID,
  UpdateUserVerified,
};
