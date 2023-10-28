import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Paper,
  Tabs,
  Typography,
  capitalize,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import {
  useGetAllFavoritesMutation,
  useGetAllServicesQuery,
} from "../services/api/apiSlice";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import styled from "@emotion/styled";
import ServiceCard from "../components/ServiceCard";
import { setFavorites } from "../services/store/features/favoritesSlice";
import { setSnack } from "../services/store/features/snackSlice";
import { logout } from "../services/store/features/account/accountSlice";

const LandingPage = () => {
  const accountData = useSelector((state) => state.accountReducer.accountData);
  const { data, isLoading, error } = useGetAllServicesQuery();
  const [getAllFavorites] = useGetAllFavoritesMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    getAllFavorites()
      .unwrap()
      .then((data) => {
        dispatch(setFavorites(data.favorites));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setSnack(error));
      });
  }, []);

  const categorizedServices = {};

  data?.forEach((elem) => {
    if (!categorizedServices[elem.category_name]) {
      categorizedServices[elem.category_name] = [];
    }

    categorizedServices[elem.category_name].push(elem);
  });

  return (
    <Container maxWidth="xl">
      <Box mt={5}>
        <Box
          display="flex"
          justifyContent="space-between">
          <Typography variant="h4">
            {capitalize(accountData.account)}
          </Typography>
          <IconButton
            onClick={() => {
              dispatch(logout());
            }}>
            <LogoutRoundedIcon fontSize="large" />
          </IconButton>
        </Box>
        <Divider />

        {Object.keys(categorizedServices)?.map((elem) => {
          return (
            <>
              <Typography
                mt={2}
                color="text.secondary"
                variant="h5">
                {elem}
              </Typography>
              <Tabs
                variant="scrollable"
                scrollButtons
                value={0}
                aria-label="scrollable auto tabs example">
                {Object.values(categorizedServices)
                  .filter(([service]) => service.category_name === elem)
                  .map(([serviceData]) => (
                    <ServiceCard
                      service={serviceData}
                      key={serviceData.id}
                    />
                  ))}
              </Tabs>
            </>
          );
        })}
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default LandingPage;
