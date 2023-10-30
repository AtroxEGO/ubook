import { Backdrop, Box, CircularProgress, Container, Tab } from "@mui/material";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAllFavoritesMutation,
  useGetAllServicesQuery,
} from "../services/api/apiSlice";
import { setFavorites } from "../services/store/features/favoritesSlice";
import { setSnack } from "../services/store/features/snackSlice";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { ServiceList } from "../components/ServiceList";
// import { Scheduler } from "@aldabil/react-scheduler";

const LazyScheduler = lazy(() => import("../components/LazyScheduler"));

const LandingPage = () => {
  const accountData = useSelector((state) => state.accountReducer.accountData);
  const { data: allServices, isLoading } = useGetAllServicesQuery();
  const [getAllFavorites] = useGetAllFavoritesMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accountData.account === "user") {
      getAllFavorites()
        .unwrap()
        .then((data) => {
          dispatch(setFavorites(data.favorites.map((item) => item.serviceID)));
        })
        .catch((error) => {
          dispatch(setSnack(error));
        });
    }
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <Container maxWidth="xl">
      <Box mt={5}>
        <Navbar
          accountData={accountData}
          dispatch={dispatch}
          navigate={navigate}
          handleSearchChange={handleSearchChange}
        />

        {accountData.account === "user" ? (
          <ServiceList
            allServices={allServices}
            searchTerm={searchTerm}
          />
        ) : (
          <div>
            <Suspense fallback={<div>Loading</div>}>
              <LazyScheduler />
            </Suspense>
          </div>
        )}
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default LandingPage;
