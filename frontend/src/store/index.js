import { configureStore } from "@reduxjs/toolkit";
import { authMiddleware } from "./authMiddleware";
import authReducer from "./auth-slice";

const store = configureStore({
  reducer: { auth: authReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});

export default store;
