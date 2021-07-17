import {
  SET_UNAUTHENTICATED,
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  REGISTER_SUCCESS,
  CLOSE_REGISTER,
  OPEN_LOGIN,
} from "../types";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("http://localhost:4000/api/register", userData)
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: REGISTER_SUCCESS });
      dispatch({ type: CLOSE_REGISTER });
      dispatch({ type: OPEN_LOGIN });
      history.push("/login");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const loginUser = (userData, history) => (dispatch) => {
  axios
    .post("http://localhost:4000/api/login", userData)
    .then((res) => {
      // store the token for continued sessions
      const IdToken = `${res.data.token}`;
      localStorage.setItem("IdToken", IdToken);
      axios.defaults.headers.common["auth-token"] = IdToken; // need to set the headers with the token
      const decoded = jwt_decode(IdToken);
      dispatch(setUserAuthenticated(decoded));
      dispatch({ type: CLEAR_ERRORS });
      history.push("/"); // redirect to home page // pass history as a param
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const setUserAuthenticated = (decoded) => {
  return {
    type: SET_USER,
    payload: decoded,
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("IdToken");
  delete axios.defaults.headers.common["auth-token"];
  dispatch({
    type: SET_UNAUTHENTICATED,
  });
};
