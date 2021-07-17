import { GET_PRODUCTS, DELETE_PRODUCT, ADD_PRODUCT } from "../types";
import axios from "axios";

export const getProducts = () => (dispatch) => {
  axios
    // .get("https://murphy-api.herokuapp.com/api/product")
    .get("http://localhost:4000/api/product")
    .then((res) => {
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteProduct = (pid) => (dispatch) => {
  axios
    // .delete(`https://murphy-api.herokuapp.com/api/product/${pid}`)
    .delete(`http://localhost:4000/api/product/${pid}`)
    .then(() => {
      dispatch({
        type: DELETE_PRODUCT,
        payload: pid,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addProduct = (formData) => (dispatch) => {
  axios
    // .post("https://murphy-api.herokuapp.com/api/product", formData)
    .post("http://localhost:4000/api/product", formData)
    .then((res) => {
      dispatch({
        type: ADD_PRODUCT,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
