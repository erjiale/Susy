import {
  OPEN_LOGIN,
  OPEN_REGISTER,
  CLOSE_REGISTER,
  CLOSE_LOGIN,
  OPEN_CART,
  CLOSE_CART,
  VERIFY_USER,
} from "../types";
import axios from "axios";

export const openLogin = () => (dispatch) => {
  dispatch({ type: OPEN_LOGIN });
};

export const openRegister = () => (dispatch) => {
  dispatch({ type: OPEN_REGISTER });
};

export const closeLogin = () => (dispatch) => {
  dispatch({ type: CLOSE_LOGIN });
};

export const closeRegister = () => (dispatch) => {
  dispatch({ type: CLOSE_REGISTER });
};

export const openCart = () => (dispatch) => {
  dispatch({ type: OPEN_CART });
};

export const closeCart = () => (dispatch) => {
  dispatch({ type: CLOSE_CART });
};

export const verifyUser = (emailToken) => (dispatch) => {
  axios
    .patch(`http://localhost:4000/api/verify/${emailToken}`)
    .then(() => {
      dispatch({ type: VERIFY_USER });
    })
    .catch((err) => {
      console.log(err);
    });
};
