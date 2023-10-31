const express = require("express");
const router = express.Router();
const {
  GetAllServices,
  GetServiceById,
  GetServicesByIDs,
  GetAvailableHours,
  GetAllSubcategories,
} = require("../controllers/Services");

router.get("/getAllSubcategories", GetAllSubcategories);

router.get("/getAll", GetAllServices);

router.post("/getById", GetServiceById);

router.post("/getByIds", GetServicesByIDs);

router.post("/getAvailableHours", GetAvailableHours);

module.exports = { ServicesRouter: router };
