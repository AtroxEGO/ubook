import { Box, Container, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  useGetAllFavoritesMutation,
  useGetUpcomingBookingsMutation,
} from "../services/api/apiSlice";
import BookingCard from "../components/BookingCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";

const FavoritePage = () => {
  const [favoriteServices, setFavoriteServices] = useState();
  const [getFavorites] = useGetAllFavoritesMutation();
  const navigate = useNavigate();

  useEffect(() => {
    getFavorites()
      .unwrap()
      .then((data) => {
        console.log(data);
        setFavoriteServices(data.favorites);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container
      component="main"
      maxWidth="lg">
      <Box mt={8}>
        <Box
          display="flex"
          alignItems="center">
          <IconButton onClick={() => navigate(-1)}>
            <Tooltip title="Back">
              <ArrowBackIcon fontSize="large" />
            </Tooltip>
          </IconButton>
          <Typography
            component="h1"
            variant="h5">
            Favorites
          </Typography>
        </Box>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={1}>
          {favoriteServices &&
            favoriteServices.map((favorite) => {
              return (
                <ServiceCard
                  key={favorite.serviceID}
                  service={favorite}
                />
              );
            })}
        </Box>
      </Box>
    </Container>
  );
};

export default FavoritePage;
