import { GET_PRODUCTS, DELETE_PRODUCT, ADD_PRODUCT } from "../types";

const initialState = {
  products: [], // array that will hold all of the products
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.pid !== action.payload
        ),
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    default:
      return state;
  }
}
