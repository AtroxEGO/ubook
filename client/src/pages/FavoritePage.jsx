import { Box, Container, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useGetAllFavoritesMutation } from "../services/api/apiSlice";
import ServiceCard from "../components/ServiceCard";
import { Navbar } from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "../services/store/features/favoritesSlice";
const FavoritePage = () => {
  const favorites = useSelector((state) => state.favoriteReducer.favorites);
  const dispatch = useDispatch();
  const [getFavorites, { isLoading }] = useGetAllFavoritesMutation();

  useEffect(() => {
    getFavorites()
      .unwrap()
      .then((data) => {
        console.log(data);
        dispatch(setFavorites(data.favorites));
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      component="main"
      maxWidth="lg">
      <Box mt={5}>
        <Navbar title="Favorites" />
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={1}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              {favorites && favorites.length > 0 ? (
                favorites.map((favorite) => {
                  return (
                    <ServiceCard
                      key={favorite.serviceID}
                      service={favorite}
                    />
                  );
                })
              ) : (
                <>None!</>
              )}
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default FavoritePage;
