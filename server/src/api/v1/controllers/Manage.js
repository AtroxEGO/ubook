const Error = require("../helpers/Error");
const errorMessages = require("../helpers/ErrorMessages");
const {
  InsertService,
  UpdateService,
  QueryServiceById,
  DeleteService,
} = require("../services/ServicesTable");

//  Create a new service.
const CreateService = async (req, res) => {
  console.log(req.body);
  req.body = { ...req.body, created_by: req.userData.id };
  const result = await InsertService(req.body);
  if (result.insertID) {
    res.json(result);
  } else {
    res.status(500).json(result);
  }
};

// Update Service Data
const UpdateServiceData = async (req, res) => {
  const body = req.body;

  const result = await UpdateService(body);
  if (result.response) {
    res.json(result);
  } else {
    res.status(500).json(result);
  }
};

const DeleteExistingService = async (req, res) => {
  const serviceID = req.body.id;

  const result = await DeleteService(serviceID);
  if (result.response) {
    res.json(result);
  } else {
    res.status(500).json(result);
  }
};

module.exports = { CreateService, UpdateServiceData, DeleteExistingService };
