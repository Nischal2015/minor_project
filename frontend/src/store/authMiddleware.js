import { authActions } from "./auth-slice";

export const authMiddleware = (store) => (next) => (action) => {
  if (authActions.loginSuccess.match(action)) {
    localStorage.setItem("access", action.payload.access);
    localStorage.setItem("refresh", action.payload.refresh);
  } else if (
    authActions.logout.match(action) ||
    authActions.loginFail.match(action)
  ) {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("isAuthenticated");
  }
  return next(action);
};
