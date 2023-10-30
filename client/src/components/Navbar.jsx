import {
  Box,
  Divider,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  capitalize,
} from "@mui/material";
import React from "react";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AddIcon from "@mui/icons-material/Add";
import { logout } from "../services/store/features/account/accountSlice";
import { Favorite } from "@mui/icons-material";

export function Navbar(props) {
  return (
    <>
      <Box display="flex">
        <Typography
          sx={{
            cursor: "pointer",
            userSelect: "none",
          }}
          onClick={() => {
            props.navigate("/");
          }}
          variant="h4"
          width="100%">
          UBook | {capitalize(props.accountData.account)}
        </Typography>
        {props.accountData.account === "user" ? (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                mb: 2,
                width: "100%",
              }}>
              <SearchIcon
                sx={{
                  color: "action.active",
                  mr: 1,
                  my: 0.5,
                }}
              />
              <TextField
                id="search-bar"
                label="Search"
                variant="standard"
                onChange={props.handleSearchChange}
              />
            </Box>
            <Box
              display="flex"
              alignItems="center">
              <IconButton onClick={() => props.navigate("/favorite")}>
                <Tooltip title="Favorite">
                  <Favorite fontSize="large" />
                </Tooltip>
              </IconButton>
              <IconButton onClick={() => props.navigate("/myBookings")}>
                <Tooltip title="Bookings">
                  <CalendarMonthIcon fontSize="large" />
                </Tooltip>
              </IconButton>
              <IconButton
                name="logoutButton"
                aria-label="log out"
                onClick={() => {
                  props.dispatch(logout());
                  props.navigate("/login");
                }}>
                <Tooltip title="Log out">
                  <LogoutRoundedIcon fontSize="large" />
                </Tooltip>
              </IconButton>
            </Box>
          </>
        ) : (
          <>
            <Box
              display="flex"
              alignItems="center">
              <IconButton onClick={() => props.navigate("/createService")}>
                <Tooltip title="Create Serivce">
                  <AddIcon fontSize="large" />
                </Tooltip>
              </IconButton>
              <IconButton onClick={() => props.navigate("/pending")}>
                <Tooltip title="Pending Approval">
                  <PendingActionsIcon fontSize="large" />
                </Tooltip>
              </IconButton>
              <IconButton
                name="logoutButton"
                aria-label="log out"
                onClick={() => {
                  props.dispatch(logout());
                  props.navigate("/login");
                }}>
                <Tooltip title="Log out">
                  <LogoutRoundedIcon fontSize="large" />
                </Tooltip>
              </IconButton>
            </Box>
          </>
        )}
      </Box>
      <Divider />
    </>
  );
}
