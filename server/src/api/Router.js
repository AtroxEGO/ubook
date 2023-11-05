const express = require("express");
const router = express.Router();
const TokenVerifier = require("./middlewares/TokenVerifier");
const CorrectAccountTypeMiddleware = require("./middlewares/CorrectAccountTypeMiddleware");
const { UserRouter } = require("./routes/User");
const { BusinessRouter } = require("./routes/Business");
const { ServicesRouter } = require("./routes/Services");
const { ManageRouter } = require("./routes/Manage");
const { FavoritesRouter } = require("./routes/Favorites");
const { ReviewsRouter } = require("./routes/Reviews");
const { BookingsRouter } = require("./routes/Bookings");

// Check servers health
router.get("/", (_, res) => {
  res.send("Ok");
});

// Requests regarding user account
router.use("/user", UserRouter);

// Requests regarding business account
router.use("/business", BusinessRouter);

// Requests regarding service browsing
router.use("/services", [TokenVerifier], ServicesRouter);

// Requests regarding managing services by business
router.use(
  "/manage",
  [TokenVerifier, CorrectAccountTypeMiddleware("business")],
  ManageRouter
);

// Requests regarding favorite services
router.use(
  "/favorites",
  [TokenVerifier, CorrectAccountTypeMiddleware("user")],
  FavoritesRouter
);

// Requests regarding reviews
router.use("/reviews", [TokenVerifier], ReviewsRouter);

// Requests regarding bookings
router.use("/bookings", [TokenVerifier], BookingsRouter);

module.exports = { Router: router };
