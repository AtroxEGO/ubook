const { pool } = require("../helpers/Database");
const errorMessages = require("../helpers/ErrorMessages");

const InsertBusiness = async (businessData) => {
  const [res] = await pool.execute(
    "INSERT INTO businesses VALUES (null,?,?,?,?,?,?,false)",
    Object.values(businessData)
  );
  if (res.insertId) {
    return res.insertId;
  } else {
    return errorMessages.internalError;
  }
};

const QueryBusinessDataFromEmail = async (businessEmail) => {
  const [[res]] = await pool.execute(
    `SELECT *
     FROM BUSINESSES WHERE email = ?;
    `,
    [businessEmail]
  );
  return res;
};

const QueryBusinessTokenData = async (userID) => {
  const [[res]] = await pool.execute(`SELECT * FROM businesses WHERE id = ?;`, [
    userID,
  ]);
  return res;
};

const QueryBusinessVerificationEmailData = async (userID) => {
  const [[res]] = await pool.execute(
    `SELECT email, first_name
     FROM businesses WHERE id = ?;
    `,
    [userID]
  );
  return res;
};

module.exports = {
  InsertBusiness,
  QueryBusinessTokenData,
  QueryBusinessVerificationEmailData,
  QueryBusinessDataFromEmail,
};
