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

module.exports = { InsertUserCode };
