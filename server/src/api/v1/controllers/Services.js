const Error = require("../helpers/Error");
const {
  QueryAllServices,
  QueryServiceById,
} = require("../services/ServicesTable");

const GetAllServices = async (req, res) => {
  const result = await QueryAllServices();
  res.json(result);
};

const GetServiceById = async (req, res) => {
  const serviceID = req.body.id;
  if (!serviceID)
    return res.status(400).json(Error("Service ID not specified!", "general"));
  const result = await QueryServiceById(req.body.id);
  res.json(result);
};

module.exports = { GetAllServices, GetServiceById };
