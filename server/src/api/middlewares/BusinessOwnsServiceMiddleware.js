const Error = require("../helpers/Error");
const errorMessages = require("../helpers/ErrorMessages");
const { QueryServiceById } = require("../services/ServicesTable");

// Checks if request sender is an owner of the business it is trying to manage
const BusinessOwnsService = () => async (req, res, next) => {
  const accountID = req.userData.id;
  const serviceID = req.body.serviceID || req.body.id;

  if (!serviceID) return res.status(400).json(Error(errorMessages.missingData));

  const service = await QueryServiceById(serviceID);

  if (!service) return res.status(400).json(Error(errorMessages.doesntExist));

  if (service.created_by != accountID) {
    return res.status(401).json(Error(errorMessages.notAuthorized));
  }
  next();
};

module.exports = BusinessOwnsService;
