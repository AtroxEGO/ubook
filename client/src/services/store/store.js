import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accountSlice";
import snackReducer from "./features/snackSlice";
import favoriteReducer from "./features/favoritesSlice";
import ownedServicesReducer from "./features/ownedServicesSlice";
import { api } from "../api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

const initialState = JSON.parse(sessionStorage.getItem("reduxState")) || {};

export const sessionStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  sessionStorage.setItem("reduxState", JSON.stringify(state));
  return result;
};

export const store = configureStore({
  reducer: {
    accountReducer,
    snackReducer,
    favoriteReducer,
    ownedServicesReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(sessionStorageMiddleware),
  preloadedState: initialState,
});

setupListeners(store.dispatch);
