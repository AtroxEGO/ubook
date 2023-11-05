const { pool } = require("../helpers/Database");
const errorMessages = require("../helpers/ErrorMessages");

const InsertBusiness = async (businessData) => {
  console.log(businessData);
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

const QueryBusinessDataFromID = async (userID) => {
  const [[res]] = await pool.execute(
    `SELECT *
     FROM BUSINESSES WHERE id = ?;
    `,
    [userID]
  );
  return res;
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
    `SELECT email, name
     FROM businesses WHERE id = ?;
    `,
    [userID]
  );
  return res;
};

const UpdateBusinessVerified = async (userID) => {
  const [res] = await pool.execute(
    "UPDATE businesses SET verified = 1 WHERE id = ?",
    [userID]
  );
  return res;
};

module.exports = {
  InsertBusiness,
  QueryBusinessTokenData,
  UpdateBusinessVerified,
  QueryBusinessVerificationEmailData,
  QueryBusinessDataFromEmail,
  QueryBusinessDataFromID,
};
