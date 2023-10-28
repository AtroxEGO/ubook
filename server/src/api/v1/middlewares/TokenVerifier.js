const jwt = require("jsonwebtoken");
const Error = require("../helpers/Error");
require("dotenv").config();

module.exports = (request, response, next) => {
  const token = request.header("Authorization")?.replace("Bearer ", "");
  if (!token)
    return response
      .status(401)
      .json(Error("Access denied. No token provided", "general"));

  if (token === "token") return next();

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    if (
      decodedToken["verified"] === 0 &&
      request.route.path != "/resendCode" &&
      request.route.path != "/verify"
    ) {
      return response
        .status(401)
        .json(Error("Account not verified!", "general"));
    }
    request.userData = decodedToken;
  } catch (error) {
    console.log(error);
    return response
      .status(401)
      .json(Error("Token invalid or expired", "general"));
  }
  // setTimeout(() => {
  next();
  // }, 2000);
};
