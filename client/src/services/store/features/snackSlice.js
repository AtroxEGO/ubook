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
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    removeSnack: (state) => {
      state.open = false;
    },
  },
});

export const { setSnack, removeSnack } = snackSlice.actions;
export default snackSlice.reducer;
