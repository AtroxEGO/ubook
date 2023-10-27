const express = require("express");
const router = express.Router();
const {
  GetAllServices,
  GetServiceById,
  GetServicesByIDs,
  GetAvailableHours,
} = require("../controllers/Services");

router.get("/getAll", GetAllServices);

router.post("/getById", GetServiceById);

router.post("/getByIds", GetServicesByIDs);

router.post("/getAvailableHours", GetAvailableHours);

module.exports = { ServicesRouter: router };
