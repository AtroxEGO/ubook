const jwt = require("jsonwebtoken");
const { QueryUserTokenData } = require("../services/UserTable");
const { QueryBusinessTokenData } = require("../services/BusinessTable");
const config = require("../../config/config");

const CreateToken = async (userID, account) => {
  const tokenData =
    account == "user"
      ? await QueryUserTokenData(userID)
      : await QueryBusinessTokenData(userID);

  const token = jwt.sign(
    { ...tokenData, account },
    process.env.JWT_PRIVATE_KEY,
    {
      expiresIn: config.sessionDuration,
    }
  );

  return token;
};

module.exports = { CreateToken };
