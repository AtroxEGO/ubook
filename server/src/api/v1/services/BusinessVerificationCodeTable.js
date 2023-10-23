const { pool } = require("../helpers/Database");
const errorMessages = require("../helpers/ErrorMessages");

const InsertBusinessCode = async (ownerID, code, accountType) => {
  const [res] = await pool.execute(
    `INSERT INTO business_verification_codes 
    VALUES (?,?, DEFAULT) 
    ON DUPLICATE KEY 
    UPDATE verification_code = ?, timestamp = DEFAULT;`,
    [ownerID, code, code]
  );
  if (res.insertId) {
    return res.insertId;
  } else {
    return errorMessages.internalError;
  }
};

const QueryBusinessCode = async (userID) => {
  const [[res]] = await pool.execute(
    "SELECT * FROM business_verification_codes WHERE owner_id = ?",
    [userID]
  );
  return res;
};

const DeleteBusinessCode = async (userID) => {
  const [res] = await pool.execute(
    "DELETE FROM business_verification_codes WHERE owner_id = ?",
    [userID]
  );
  return res;
};

module.exports = { InsertBusinessCode, QueryBusinessCode, DeleteBusinessCode };
