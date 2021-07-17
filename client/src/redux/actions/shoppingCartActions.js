import {
  GET_CART,
  ADD_PRODUCT_TO_CART,
  DELETE_ONE_QUANTITY_FROM_CART,
  DELETE_PRODUCT_FROM_CART,
} from "../types";
import axios from "axios";

export const getCartProducts = () => (dispatch) => {
  axios
    .get("http://localhost:4000/api/cart")
    .then((res) => {
      dispatch({
        type: GET_CART,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addProductToCart = (pid) => (dispatch) => {
  axios
    .post(`http://localhost:4000/api/cart/${pid}`)
    .then((res) => {
      dispatch({
        type: ADD_PRODUCT_TO_CART,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const removeOneQuantityFromCart = (pid) => (dispatch) => {
  axios
    .patch(`http://localhost:4000/api/cart/${pid}`)
    .then((res) => {
      dispatch({
        type: DELETE_ONE_QUANTITY_FROM_CART,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const removeProductFromCart = (pid) => (dispatch) => {
  axios
    .delete(`http://localhost:4000/api/cart/${pid}`)
    .then((res) => {
      dispatch({
        type: DELETE_PRODUCT_FROM_CART,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
