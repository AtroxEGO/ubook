const Error = require("../helpers/Error");
const errorMessages = require("../helpers/ErrorMessages");
const moment = require("moment");
const {
  QueryAllServices,
  QueryServiceById,
  QueryServicesByIDs,
} = require("../services/ServicesTable");
const { getAvaiableHoursAsTimestamps } = require("../helpers/Booking");

const GetAllServices = async (req, res) => {
  const result = await QueryAllServices();
  res.json(result);
};

const GetServiceById = async (req, res) => {
  const serviceID = req.body.id;
  if (!serviceID)
    return res.status(400).json(Error("Service ID not specified!"));
  const result = await QueryServiceById(serviceID);
  res.json(result);
};

const GetServicesByIDs = async (req, res) => {
  const serviceIDs = req.body.serviceIDs;
  if (!serviceIDs)
    return res.status(400).json(Error("Service IDs not specified!"));
  const result = await QueryServicesByIDs(serviceIDs);
  res.json(result);
};

const GetAvailableHours = async (req, res) => {
  const serviceID = req.body.serviceID;
  const date = moment(req.body.date);

  if (!date.isValid())
    return res.status(400).json(Error(errorMessages.invalidData));

  if (!serviceID || !date)
    return res.status(400).json(Error(errorMessages.missingData));

  const service = await QueryServiceById(serviceID);

  res.json(await getAvaiableHoursAsTimestamps(service, date));
};

module.exports = {
  GetAllServices,
  GetServiceById,
  GetServicesByIDs,
  GetAvailableHours,
};
