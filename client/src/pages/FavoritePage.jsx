import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetAllFavoritesMutation } from "../services/api/apiSlice";
import ServiceCard from "../components/ServiceCard";
import { Navbar } from "../components/Navbar";

const FavoritePage = () => {
  const [favoriteServices, setFavoriteServices] = useState();
  const [getFavorites] = useGetAllFavoritesMutation();

  useEffect(() => {
    getFavorites()
      .unwrap()
      .then((data) => {
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
        <Navbar title="Favorites" />
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
