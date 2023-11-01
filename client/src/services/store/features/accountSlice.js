import { createSlice } from "@reduxjs/toolkit";
import { setFavorites } from "./favoritesSlice";

const initialState = {
  loggedIn: false,
  token: null,
  accountData: {
    email: null,
    avatar_url: null,
    verified: false,
    accountType: null,
    name: null,
    firstName: null,
    lastName: null,
  },
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.token = action.payload.token;
      state.accountData = action.payload.accountData;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.token = null;
      state.accountData = null;
    },
  },
});

export const { login, logout } = accountSlice.actions;
export default accountSlice.reducer;
