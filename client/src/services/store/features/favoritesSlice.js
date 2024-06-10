import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: "snacks",
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      console.log(action.payload);
      state.favorites = action.payload;
    },
  },
});

export const { setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
