const express = require("express");
const router = express.Router();
const TokenVerifier = require("./middlewares/TokenVerifier");
const CorrectAccountTypeMiddleware = require("./middlewares/CorrectAccountTypeMiddleware");

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
router.use(
  "/manage",
  [TokenVerifier, CorrectAccountTypeMiddleware("business")],
  ManageRouter
);

// Requests regarding favorite services
const { FavoritesRouter } = require("./routes/Favorites");
router.use(
  "/favorites",
  [TokenVerifier, CorrectAccountTypeMiddleware("user")],
  FavoritesRouter
);

// Requests regarding reviews
const { ReviewsRouter } = require("./routes/Reviews");
router.use("/reviews", [TokenVerifier], ReviewsRouter);

module.exports = { VersionRouter: router };
