import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alertType: null,
  message: null,
  logging: false,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    loggingState(state) {
      state.logging = true;
    },
    success(state, action) {
      state.alertType = "alert--success";
      state.message = action.payload;
      state.logging = false;
    },
    error(state, action) {
      state.alertType = "alert--error";
      state.message = action.payload;
      state.logging = false;
    },
    information(state, action) {
      state.alertType = "alert--information";
      state.message = action.payload;
      state.logging = false;
    },
    clear(state) {
      state.alertType = null;
      state.message = null;
      state.logging = false;
    },
  },
});

export const alertActions = alertSlice.actions;
export default alertSlice.reducer;
