import {
  Box,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
  capitalize,
} from "@mui/material";
import React from "react";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FolderIcon from "@mui/icons-material/Folder";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import { logout } from "../services/store/features/account/accountSlice";
import { Favorite } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";

export function Navbar(props) {
  const accountData = useSelector((state) => state.accountReducer.accountData);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Container
      component="nav"
      sx={{ mb: 4 }}
      maxWidth="xl">
      <Box
        display="flex"
        gap={1}
        sx={{
          flexWrap: { xs: "wrap", sm: "nowrap" },
          justifyContent: { xs: "center", sm: "space-between" },
        }}>
        {props.title ? (
          <Box
            display="flex"
            alignItems="center"
            sx={{ width: { xs: "100%", sm: "fit-content" } }}>
            <IconButton onClick={() => navigate(-1)}>
              <Tooltip title="Back">
                <ArrowBackIcon
                  color="primary"
                  fontSize="large"
                />
              </Tooltip>
            </IconButton>
            <Typography
              color="primary"
              component="h1"
              variant="h5">
              {props.title}
            </Typography>
          </Box>
        ) : (
          <Typography
            color="primary"
            sx={{
              mr: { xs: 0, sm: 1 },
              cursor: "pointer",
              userSelect: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "center", sm: "flex-start" },
              minWidth: { xs: "100%", sm: "fit-content" },
            }}
            onClick={() => {
              navigate("/");
            }}
            variant="h4">
            UBook | {capitalize(accountData.account)}
          </Typography>
        )}
        {accountData.account === "user" ? (
          <>
            {location.pathname === "/" && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  mb: 0.6,
                }}>
                <Tooltip title="Search">
                  <TextField
                    id="search-bar"
                    color="primary"
                    // label="Search"
                    size="small"
                    variant="outlined"
                    onChange={props.handleSearchChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Tooltip>
              </Box>
            )}
            <Box
              display="flex"
              alignItems="center">
              <IconButton onClick={() => navigate("/")}>
                <Tooltip title="Home">
                  <HomeIcon fontSize="large" />
                </Tooltip>
              </IconButton>
              <IconButton onClick={() => navigate("/favorite")}>
                <Tooltip title="Favorite">
                  <Favorite fontSize="large" />
                </Tooltip>
              </IconButton>
              <IconButton onClick={() => navigate("/myBookings")}>
                <Tooltip title="Bookings">
                  <CalendarMonthIcon fontSize="large" />
                </Tooltip>
              </IconButton>
              <IconButton
                name="logoutButton"
                aria-label="log out"
                onClick={() => {
                  dispatch(logout());
                  navigate("/login");
                }}>
                <Tooltip title="Log out">
                  <LogoutRoundedIcon fontSize="large" />
                </Tooltip>
              </IconButton>
            </Box>
          </>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            sx={{
              width: { xs: "100%", sm: "fit-content" },
            }}>
            <Box
              display="flex"
              alignItems="center">
              <IconButton onClick={() => navigate("/")}>
                <Tooltip title="Home">
                  <HomeIcon fontSize="large" />
                </Tooltip>
              </IconButton>
              <IconButton onClick={() => navigate("/createService")}>
                <Tooltip title="Create Serivce">
                  <AddIcon fontSize="large" />
                </Tooltip>
              </IconButton>
              <IconButton onClick={() => navigate("/services")}>
                <Tooltip title="Manage Services">
                  <FolderIcon fontSize="large" />
                </Tooltip>
              </IconButton>
              <IconButton onClick={() => navigate("/pending")}>
                <Tooltip title="Pending Approval">
                  <PendingActionsIcon fontSize="large" />
                </Tooltip>
              </IconButton>
              <IconButton
                name="logoutButton"
                aria-label="log out"
                onClick={() => {
                  dispatch(logout());
                  navigate("/login");
                }}>
                <Tooltip title="Log out">
                  <LogoutRoundedIcon fontSize="large" />
                </Tooltip>
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>
      <Divider />
    </Container>
  );
}
