import { createSlice } from "@reduxjs/toolkit";
import { closeWebSocketConnection, connectWebSocket } from "../../WebSocket";

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
      connectWebSocket(action.payload.token);
    },
    logout: (state) => {
      state.loggedIn = false;
      state.token = null;
      state.accountData = null;
      closeWebSocketConnection();
    },
  },
});

export const { login, logout } = accountSlice.actions;
export default accountSlice.reducer;
