import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Tabs,
  TextField,
  Typography,
  capitalize,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SearchIcon from "@mui/icons-material/Search";
import {
  useGetAllFavoritesMutation,
  useGetAllServicesQuery,
} from "../services/api/apiSlice";
import ServiceCard from "../components/ServiceCard";
import { setFavorites } from "../services/store/features/favoritesSlice";
import { setSnack } from "../services/store/features/snackSlice";
import { logout } from "../services/store/features/account/accountSlice";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const accountData = useSelector((state) => state.accountReducer.accountData);
  const { data, isLoading } = useGetAllServicesQuery();
  const [getAllFavorites] = useGetAllFavoritesMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const uniqueCategories = new Set();

  data?.forEach((item) => {
    if (item.category_name) {
      uniqueCategories.add(item.category_name);
    }
  });

  const distinctCategoryNames = Array.from(uniqueCategories);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <Container maxWidth="xl">
      <Box mt={5}>
        <Box display="flex">
          <Typography
            sx={{ cursor: "pointer", userSelect: "none" }}
            onClick={() => {
              navigate("/");
            }}
            variant="h4"
            width="100%">
            UBook | {capitalize(accountData.account)}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              mb: 2,
              width: "100%",
            }}>
            <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="search-bar"
              label="Search"
              variant="standard"
              onChange={handleSearchChange}
            />
          </Box>
          <IconButton
            onClick={() => {
              dispatch(logout());
            }}>
            <LogoutRoundedIcon fontSize="large" />
          </IconButton>
        </Box>
        <Divider />
        {distinctCategoryNames?.map((categoryName) => {
          return (
            <>
              <Typography
                mt={2}
                color="text.secondary"
                variant="h5">
                {categoryName}
              </Typography>
              <Tabs
                variant="scrollable"
                scrollButtons
                value={0}
                aria-label="scrollable auto tabs example">
                {data
                  .filter(
                    (service) =>
                      service.name.toLowerCase().includes(searchTerm) ||
                      service.description.toLowerCase().includes(searchTerm) ||
                      service.subcategory_name
                        .toLowerCase()
                        .includes(searchTerm)
                  )
                  .filter((service) => service.category_name === categoryName)
                  .map((service) => (
                    <ServiceCard service={service} />
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
