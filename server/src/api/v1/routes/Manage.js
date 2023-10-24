const express = require("express");
const router = express.Router();
const validation = require("../middlewares/ValidationMiddleware");
const {
  CreateService,
  UpdateServiceData,
  DeleteExistingService,
} = require("../controllers/Manage");
const {
  serviceCreationSchema,
  serviceUpdateSchema,
} = require("../validations/ServiceValidation");
const BusinessOwnsService = require("../middlewares/BusinessOwnsServiceMiddleware");

// Create new service
router.post(
  "/createService",
  [validation(serviceCreationSchema)],
  CreateService
);

// Update existing service
router.post(
  "/updateService",
  [validation(serviceUpdateSchema), BusinessOwnsService()],
  UpdateServiceData
);

// Delete existing service
router.post("/deleteService", [BusinessOwnsService()], DeleteExistingService);

module.exports = { ManageRouter: router };
