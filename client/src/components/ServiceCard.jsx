import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import image from "../assets/placeholder.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import {
  Avatar,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from "../services/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "../services/store/features/favoritesSlice";
import { setSnack } from "../services/store/features/snackSlice";
import { useNavigate } from "react-router-dom";

export default function ServiceCard({ service }) {
  const dispatch = useDispatch();
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favoriteReducer.favorites);
  const handleFavoriteClick = (serviceID) => {
    if (favorites.includes(serviceID)) {
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
    <Card
      variant="outlined"
      sx={{
        minWidth: "20em",
        marginInline: "0.5em",
        marginBlock: "0.5em",
      }}>
      <CardMedia
        component="img"
        height="170"
        image={image}
        alt="service image"
      />
      <CardHeader
        avatar={
          <Tooltip title={service.creator_name}>
            <Avatar src={service.avatar_url} />
          </Tooltip>
        }
        title={service.name}
        subheader={service.subcategory_name}
      />
      <CardContent
        sx={{
          paddingBlock: "0",
        }}>
        <ListItem disablePadding>
          <ListItemIcon sx={{ minWidth: "26px" }}>
            <AccessTimeRoundedIcon color="primary" />
          </ListItemIcon>
          <ListItemText>{service.duration}</ListItemText>
          <ListItemIcon sx={{ minWidth: "26px" }}>
            <AttachMoneyRoundedIcon color="primary" />
          </ListItemIcon>
          <ListItemText>{service.price}zł</ListItemText>
          <ListItemIcon sx={{ minWidth: "26px" }}>
            <StarBorderRoundedIcon color="primary" />
          </ListItemIcon>
          <ListItemText>
            <Typography
              display="flex"
              gap="0.3em"
              alignItems="center">
              {service.averageReview}
              <Typography
                fontSize="small"
                color="text.secondary">
                ({service.reviewCount})
              </Typography>
            </Typography>
          </ListItemText>
        </ListItem>
        <Typography
          variant="body2"
          style={{ display: "inline-block", whiteSpace: "pre-line" }}>
          {service.description + service.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Favorite">
          <IconButton
            aria-label="add to favorites"
            onClick={() => {
              handleFavoriteClick(service.serviceID);
            }}
            name="favoriteButton">
            {favorites.includes(service.serviceID) ? (
              <FavoriteIcon color="primary" />
            ) : (
              <FavoriteBorderRoundedIcon color="primary" />
            )}
          </IconButton>
        </Tooltip>
        <Tooltip title="Check">
          <IconButton
            aria-label="check the service"
            sx={{ marginLeft: "auto" }}
            onClick={() => {
              navigate("/service", { serviceID: service.serviceID });
            }}>
            <ArrowForwardIosRoundedIcon color="primary" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
