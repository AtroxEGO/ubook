const { QueryAllServices } = require("../services/ServicesTable");

const GetAllServices = async (req, res) => {
  const result = await QueryAllServices();
  res.json(result);
};

const GetServiceById = async (req, res) => {
  const result = await QueryServiceById(req.body.id);
  res.json(result);
};

module.exports = { GetAllServices, GetServiceById };
