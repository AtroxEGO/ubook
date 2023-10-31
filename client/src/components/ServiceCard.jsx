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
  List,
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

export const ServiceCard = ({ service }) => {
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
          dispatch(setFavorites(data.favorites.map((item) => item.serviceID)));
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
          dispatch(setFavorites(data.favorites.map((item) => item.serviceID)));
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
        maxHeight: "24em",
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
        sx={{ pb: 0 }}
      />
      <CardContent
        sx={{
          maxHeight: "6em",
          overflow: "auto",
          paddingBlock: "0",
        }}>
        <List>
          <ListItem disablePadding>
            <ListItemIcon sx={{ minWidth: "26px", mr: 0.5 }}>
              <Tooltip title="Duration">
                <AccessTimeRoundedIcon color="primary" />
              </Tooltip>
            </ListItemIcon>
            <ListItemText>{service.duration}</ListItemText>
            <ListItemIcon sx={{ minWidth: "26px" }}>
              <Tooltip title="Price">
                <AttachMoneyRoundedIcon color="primary" />
              </Tooltip>
            </ListItemIcon>
            <ListItemText>{service.price}zł</ListItemText>
            <ListItemIcon sx={{ minWidth: "26px" }}>
              <Tooltip title="Rating">
                <StarBorderRoundedIcon color="primary" />
              </Tooltip>
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
        </List>
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
              navigate("/service", { state: { serviceID: service.serviceID } });
            }}>
            <ArrowForwardIosRoundedIcon color="primary" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default ServiceCard;
