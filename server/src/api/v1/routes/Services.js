const express = require("express");
const router = express.Router();
const validation = require("../middlewares/ValidationMiddleware");
const { GetAllServices, GetServiceById } = require("../controllers/Services");

router.get("/getAll", GetAllServices);

router.post("/getById", GetServiceById);

module.exports = { ServicesRouter: router };
