const express = require("express");
const {
  AddToFavorites,
  RemoveFromFavorites,
  GetAllFavorites,
} = require("../controllers/Favorites");
const router = express.Router();

// Add service to favorites (returns Notification)
router.post("/add", AddToFavorites);

// Remove service from favorites (returns Notification)
router.post("/remove", RemoveFromFavorites);

// Get all favorites that user has
router.post("/getAll", GetAllFavorites);

module.exports = { FavoritesRouter: router };
