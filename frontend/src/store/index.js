import { configureStore } from "@reduxjs/toolkit";
import { authMiddleware } from "./authMiddleware";
import authReducer from "./auth-slice";
import alertReducer from "./alert-slice";

const store = configureStore({
  reducer: { auth: authReducer, alert: alertReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});

export default store;
