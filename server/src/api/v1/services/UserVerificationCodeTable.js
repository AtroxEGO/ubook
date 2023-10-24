const { pool } = require("../helpers/Database");
const errorMessages = require("../helpers/ErrorMessages");

const InsertUserCode = async (ownerID, code, accountType) => {
  const [res] = await pool.execute(
    `INSERT INTO user_verification_codes 
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

const QueryUserCode = async (userID) => {
  const [[res]] = await pool.execute(
    "SELECT * FROM user_verification_codes WHERE owner_id = ?",
    [userID]
  );
  return res;
};

const DeleteUserCode = async (userID) => {
  const [res] = await pool.execute(
    "DELETE FROM user_verification_codes WHERE owner_id = ?",
    [userID]
  );
  return res;
};

module.exports = { InsertUserCode, DeleteUserCode, QueryUserCode };
