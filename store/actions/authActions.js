import axios from "../../utilities/axios";
import * as actionTypes from "./actionTypes";
import { Alert } from "react-native";

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
        //localStorage.setItem("token", response.data.data);
        //localStorage.setItem("tokenExpiration", tokenExpiration);

        //console.log("log in with TOKEK : !!", response.data.data);
        dispatch(authSuccess(response.data.data));
        dispatch(setAuthTimeout());
      })
      .catch((err) => {
        const error = err.response.data.error || err.message;
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
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const tokenExpiration = new Date(localStorage.getItem("tokenExpiration"));
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
