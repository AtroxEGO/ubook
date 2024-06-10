const express = require("express");
const router = express.Router();
const {
  GetAllServices,
  GetServiceById,
  GetServicesByIDs,
  GetAvailableHours,
  GetAllSubcategories,
  GetServicesOwnedByBusiness,
} = require("../controllers/Services");
const CorrectAccountType = require("../middlewares/CorrectAccountTypeMiddleware");

router.get("/getAllSubcategories", GetAllSubcategories);

router.get("/getAll", GetAllServices);

router.post("/getById", GetServiceById);

router.post(
  "/getByOwner",
  [CorrectAccountType("business")],
  GetServicesOwnedByBusiness
);

router.post("/getByIds", GetServicesByIDs);

router.post("/getAvailableHours", GetAvailableHours);

module.exports = { ServicesRouter: router };
