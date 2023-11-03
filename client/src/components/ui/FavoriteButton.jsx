import * as React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { IconButton, Tooltip } from "@mui/material";
import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from "../../services/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "../../services/store/features/favoritesSlice";
import { setSnack } from "../../services/store/features/snackSlice";

export const FavoriteButton = ({ serviceID }) => {
  const dispatch = useDispatch();
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();
  const favorites = useSelector((state) => state.favoriteReducer.favorites);

  const handleFavoriteClick = (serviceID) => {
    if (favorites.find((favorite) => favorite.serviceID === serviceID)) {
      removeFavorite({ serviceID: serviceID })
        .unwrap()
        .then((data) => {
          dispatch(setFavorites(data.favorites));
          dispatch(setSnack(data));
        })
        .catch((error) => {
          dispatch(setSnack(error));
        });
    } else {
      addFavorite({ serviceID: serviceID })
        .unwrap()
        .then((data) => {
          dispatch(setSnack(data));
          dispatch(setFavorites(data.favorites));
        })
        .catch((error) => {
          console.log(error);
          dispatch(setSnack(error));
        });
    }
  };

  return (
    <Tooltip title="Favorite">
      <IconButton
        aria-label="add to favorites"
        onClick={() => {
          handleFavoriteClick(serviceID);
        }}
        name="favoriteButton">
        {favorites.find((favorite) => favorite.serviceID === serviceID) ? (
          <FavoriteIcon color="primary" />
        ) : (
          <FavoriteBorderRoundedIcon color="primary" />
        )}
      </IconButton>
    </Tooltip>
  );
};
