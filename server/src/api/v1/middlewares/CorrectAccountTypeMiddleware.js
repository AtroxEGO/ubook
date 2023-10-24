const Error = require("../helpers/Error");
const errorMessages = require("../helpers/ErrorMessages");

const CorrectAccountType = (requiredAccountType) => async (req, res, next) => {
  const userData = req.userData;
  if (userData.account === requiredAccountType) next();
  else res.status(401).json(Error(errorMessages.invalidAccountType));
};

module.exports = CorrectAccountType;
