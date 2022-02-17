import axios from "axios";
import { authActions } from "./auth-slice";

export const createUser = (body) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    await axios.post("auth/users/", body, config);
    dispatch(authActions.signupSuccess());
  } catch (error) {
    dispatch(authActions.signupFail());
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
      const response = await axios.post("auth/jwt/verify/", body, config);
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
      const response = await axios.get("auth/users/me/", config);

      dispatch(authActions.userLoadedSuccess(response.data));
    } catch (error) {
      dispatch(authActions.userLoadedFail());
    }
  } else {
    dispatch(authActions.userLoadedFail());
  }
};

export const login = (body) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post("auth/jwt/create/", body, config);

    dispatch(authActions.loginSuccess(response.data));
    dispatch(loadUser());
  } catch (error) {
    dispatch(authActions.loginSuccess());
  }
};

export const resetPassword = (body) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    await axios.post("auth/users/reset_password/", body, config);
    dispatch(authActions.passwordResetSuccess());
  } catch (error) {
    dispatch(authActions.passwordResetFail());
  }
};

export const resetPasswordConfirm = (body) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    await axios.post("/auth/users/reset_password_confirm/", body, config);
    dispatch(authActions.passwordResetConfirmSuccess());
  } catch (error) {
    dispatch(authActions.passwordResetConfirmFail());
  }
};
