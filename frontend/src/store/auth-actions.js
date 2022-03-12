import axios from "axios";
import { authActions } from "./auth-slice";
import { alertActions } from "./alert-slice";

export const createUser = (body) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch(authActions.processingRequest());
    await axios.post("/auth/users/", body, config);
    dispatch(authActions.signupSuccess());
    dispatch(
      alertActions.success(
        `You have successfully signed up
        An verfication email has been sent to `
      )
    );
  } catch (error) {
    dispatch(authActions.signupFail());
    dispatch(alertActions.error("Username or email already exists"));
  }
};

export const verifyUser = (uid, token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = { uid, token };

  try {
    await axios.post("/auth/users/activation/", body, config);
    dispatch(authActions.activationSuccess());
  } catch (error) {
    dispatch(authActions.activationFail());
  }
};

export const checkAuthenticated = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const body = { token: localStorage.getItem("access") };

    try {
      const response = await axios.post("/auth/jwt/verify/", body, config);
      if (response.data.code !== "token_not_valid") {
        dispatch(authActions.authenticationSuccess());
      } else {
        dispatch(authActions.authenticationFail());
      }
    } catch (error) {
      dispatch(authActions.authenticationFail());
    }
  } else {
    dispatch(authActions.authenticationFail());
  }
};

export const loadUser = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const response = await axios.get("/auth/users/me/", config);
      dispatch(authActions.userLoadedSuccess(response.data));
    } catch (error) {
      dispatch(authActions.userLoadedFail());
    }
  } else {
    dispatch(authActions.userLoadedFail());
  }
};

export const login = (body, callback) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch(authActions.processingRequest());
    const response = await axios.post("/auth/jwt/create/", body, config);
    dispatch(authActions.loginSuccess(response.data));
    dispatch(loadUser());
    dispatch(alertActions.success("You have succesfully logged in"));
    callback();
  } catch (error) {
    dispatch(authActions.loginFail());
    dispatch(alertActions.error("Username or password is incorrect"));
  }
};

export const resetPassword = (body) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch(authActions.processingRequest());
    await axios.post("/auth/users/reset_password/", body, config);
    dispatch(authActions.passwordResetSuccess());
    dispatch(
      alertActions.success(`Email has been sent successfully to ${body.email}`)
    );
  } catch (error) {
    dispatch(authActions.passwordResetFail());
    dispatch(alertActions.error("Sorry, the email doesn't exist"));
  }
};

export const resetPasswordConfirm = (body) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch(authActions.processingRequest());
    await axios.post("/auth/users/reset_password_confirm/", body, config);
    dispatch(authActions.passwordResetConfirmSuccess());
    dispatch(alertActions.success("Your password has been reset successfully"));
  } catch (error) {
    dispatch(authActions.passwordResetConfirmFail());
    dispatch(alertActions.error("Failed to reset password"));
  }
};

export const logout = () => async (dispatch) => {
  dispatch(authActions.logout());
  dispatch(alertActions.success("You have been successfully logged out"));
};
