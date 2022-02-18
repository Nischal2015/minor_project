import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
    },
    userLoadedSuccess(state, action) {
      state.user = action.payload;
    },
    userLoadedFail(state) {
      state.user = null;
    },
    loginFail(state) {
      state.access = null;
      state.refresh = null;
      state.isAuthenticated = false;
      state.user = null;
    },
    authenticationSuccess(state) {
      state.isAuthenticated = true;
    },
    authenticationFail(state) {
      state.isAuthenticated = false;
    },
    logOut(state) {
      state.access = null;
      state.refresh = null;
      state.isAuthenticated = false;
      state.user = null;
    },
    passwordResetSuccess() {},
    passwordResetFail() {},
    passwordResetConfirmSuccess() {},
    passwordResetConfirmFail() {},
    signupSuccess(state) {
      state.isAuthenticated = false;
    },
    signupFail(state) {
      state.isAuthenticated = false;
    },
    activationSuccess() {},
    activationFail() {},
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
