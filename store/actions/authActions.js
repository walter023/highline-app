import axios from "../../utilities/axios";
import * as actionTypes from "./actionTypes";
import { AsyncStorage } from "react-native";

export const logout = () => {
  //localStorage.removeItem("token");
  //localStorage.removeItem("tokenExpiration");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
export const authSuccess = (token, message) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
  };
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};
export const login = (userData) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("/signin", userData)
      .then((response) => {
        const tokenExpiration = new Date(new Date().getTime() + 3600 * 1000); // current time + 1h
        AsyncStorage.setItem("token", response.data.data);
        AsyncStorage.setItem("tokenExpiration", tokenExpiration.toString());

        dispatch(authSuccess(response.data.data));
        dispatch(setAuthTimeout());
      })
      .catch((err) => {
        const error = err.message || err.response.data.error;
        dispatch(authFail(error));
      });
  };
};
export const setAuthTimeout = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, 3600 * 1000); // 1h
  };
};
export const autoLogin = () => {
  return (dispatch) => {
    const token = AsyncStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const tokenExpiration = new Date(AsyncStorage.getItem("tokenExpiration"));
      if (tokenExpiration <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          setAuthTimeout(
            (tokenExpiration.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
