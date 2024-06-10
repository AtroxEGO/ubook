const jwt = require("jsonwebtoken");
const Error = require("../helpers/Error");
const errorMessages = require("../helpers/ErrorMessages");
require("dotenv").config();

// Check if the token is valid and if the user is verified
module.exports = (socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) return next(Error(errorMessages.notAuthorized));

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    if (decodedToken["verified"] === 0) {
      return next(Error(errorMessages.notAuthorized));
    }
    socket.userData = {
      id: decodedToken.id,
      accountType: decodedToken.account,
    };
  } catch (error) {
    return next(Error(errorMessages.invalidTokenOrExpired));
  }

  next();
};
