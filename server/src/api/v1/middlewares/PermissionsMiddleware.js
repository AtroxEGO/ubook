const Error = require("../helpers/Error");
const errorMessages = require("../helpers/ErrorMessages");

const permissionsMiddleware =
  (requiredPermission) => async (req, res, next) => {
    const userData = req.userData;
    if (userData.account === requiredPermission) next();
    else res.status(401).json(Error(errorMessages.notAuthorized, "general"));
  };

module.exports = permissionsMiddleware;
