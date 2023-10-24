const express = require("express");
const router = express.Router();
const {
  GetAllServices,
  GetServiceById,
  GetServicesByIDs,
} = require("../controllers/Services");

router.get("/getAll", GetAllServices);

router.post("/getById", GetServiceById);

router.post("/getByIds", GetServicesByIDs);

module.exports = { ServicesRouter: router };
