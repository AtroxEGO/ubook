const Notification = require("../helpers/Notification");
const {
  InsertFavorite,
  DeleteFavorite,
  QueryAllFavorites,
} = require("../services/FavoritesTable");

// Add new service to user favorites
const AddToFavorites = async (req, res) => {
  const userID = req.userData.id;
  const serviceID = req.body.serviceID;

  try {
    await InsertFavorite({ userID, serviceID });
    res.json({
      ...Notification("Successfully added service to favorites!"),
      favorites: await QueryAllFavorites(userID),
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

// Removes service from user favorites
const RemoveFromFavorites = async (req, res) => {
  const userID = req.userData.id;
  const serviceID = req.body.serviceID;

  try {
    await DeleteFavorite({ userID, serviceID });
    res.json({
      ...Notification("Successfully removed service from favorites!"),
      favorites: await QueryAllFavorites(userID),
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

// Responds with all favorites that user has
const GetAllFavorites = async (req, res) => {
  const userID = req.userData.id;
  try {
    const result = await QueryAllFavorites(userID);
    res.json({ favorites: result });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports = { AddToFavorites, RemoveFromFavorites, GetAllFavorites };
