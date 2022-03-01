import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: null,
  isProcessing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    processingRequest(state) {
      state.isProcessing = true;
    },
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
      state.isProcessing = false;
    },
    userLoadedSuccess(state, action) {
      state.isProcessing = false;
      state.user = action.payload;
    },
    userLoadedFail(state) {
      state.isProcessing = false;
      state.user = null;
    },
    loginFail(state) {
      state.access = null;
      state.refresh = null;
      state.isAuthenticated = false;
      state.user = null;
      state.isProcessing = false;
    },
    authenticationSuccess(state) {
      state.isProcessing = false;
      state.isAuthenticated = true;
    },
    authenticationFail(state) {
      state.isProcessing = false;
      state.isAuthenticated = false;
    },
    logout(state) {
      state.access = null;
      state.refresh = null;
      state.isAuthenticated = false;
      state.isProcessing = false;
      state.user = null;
    },
    passwordResetSuccess(state) {
      state.isProcessing = false;
    },
    passwordResetFail(state) {
      state.isProcessing = false;
    },
    passwordResetConfirmSuccess(state) {
      state.isProcessing = false;
    },
    passwordResetConfirmFail(state) {
      state.isProcessing = false;
    },
    signupSuccess(state) {
      state.isAuthenticated = false;
      state.isProcessing = false;
    },
    signupFail(state) {
      state.isAuthenticated = false;
      state.isProcessing = false;
    },
    activationSuccess() {},
    activationFail() {},
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
