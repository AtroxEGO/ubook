const express = require("express");
const router = express.Router();
const validation = require("../middlewares/ValidationMiddleware");
const { CreateService } = require("../controllers/Manage");
const { serviceCreationSchema } = require("../validations/ServiceValidation");

router.post(
  "/createService",
  [validation(serviceCreationSchema)],
  CreateService
);

module.exports = { ManageRouter: router };
