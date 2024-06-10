import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ownedServices: [],
};

export const ownedServicesSlice = createSlice({
  name: "ownedServices",
  initialState,
  reducers: {
    setOwnedServices: (state, action) => {
      state.ownedServices = action.payload;
    },
  },
});

export const { setOwnedServices } = ownedServicesSlice.actions;
export default ownedServicesSlice.reducer;
