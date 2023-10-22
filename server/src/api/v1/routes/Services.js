const express = require("express");
const router = express.Router();
const validation = require("../middlewares/ValidationMiddleware");
const { GetAllServices } = require("../controllers/Services");

router.get("/getAll", GetAllServices);

module.exports = { ServicesRouter: router };
