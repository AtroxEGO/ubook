const express = require("express");
const router = express.Router();
const TokenVerifier = require("./middlewares/TokenVerifier");

// Requests regarding user account
const { UserRouter } = require("./routes/User");
router.use("/user", UserRouter);

// Requests regarding business account
const { BusinessRouter } = require("./routes/Business");
router.use("/business", BusinessRouter);

// Requests regarding service browsing
const { ServicesRouter } = require("./routes/Services");
router.use("/services", [TokenVerifier], ServicesRouter);

// Requests regarding managing services by business
const { ManageRouter } = require("./routes/Manage");
const permissionsMiddleware = require("./middlewares/PermissionsMiddleware");
router.use(
  "/manage",
  [TokenVerifier, permissionsMiddleware("business")],
  ManageRouter
);

module.exports = { VersionRouter: router };
