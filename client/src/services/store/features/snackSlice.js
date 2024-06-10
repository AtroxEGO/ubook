import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  message: "",
  type: "",
};

export const snackSlice = createSlice({
  name: "snacks",
  initialState,
  reducers: {
    setSnack: (state, action) => {
      state.open = true;
      state.message = action.payload.message || "Unexpected error";
      state.type = action.payload.type || "error";
    },
    removeSnack: (state) => {
      state.open = false;
    },
  },
});

export const { setSnack, removeSnack } = snackSlice.actions;
export default snackSlice.reducer;
