const Error = require("../helpers/Error");
const {
  QueryAllServices,
  QueryServiceById,
  QueryServicesByIDs,
} = require("../services/ServicesTable");

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

module.exports = { GetAllServices, GetServiceById, GetServicesByIDs };
