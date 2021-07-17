import {
  GET_CART,
  SET_UNAUTHENTICATED,
  ADD_PRODUCT_TO_CART,
  DELETE_ONE_QUANTITY_FROM_CART,
  DELETE_PRODUCT_FROM_CART,
  DELETE_PRODUCT,
} from "../types";

const initialState = {
  cart: [],
  count: 0,
  totalPrice: (0.0).toFixed(2),
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_UNAUTHENTICATED:
      return initialState;
    case GET_CART:
      let initialCount = 0,
        totalPrice = 0.0;
      // CALCULATE Total Price of items in Shopping CART
      action.payload.forEach((item) => {
        initialCount = initialCount + item.cantidad;
        totalPrice += parseFloat(item.cantidad) * parseFloat(item.precio);
      });
      return {
        ...state,
        cart: action.payload,
        count: initialCount,
        totalPrice: parseFloat(totalPrice).toFixed(2),
      };
    case ADD_PRODUCT_TO_CART:
      let ind = state.cart.findIndex((item) => item.pid === action.payload.pid);
      // If Already in Shopping CART, quantity++ WHERE pid=action.payload.pid
      if (action.payload.img === undefined) {
        state.cart[ind].cantidad = action.payload.cantidad;
        return {
          ...state,
          cart: [...state.cart],
          count: state.count + 1, // UPDATE total Item Count in CART
          totalPrice: (
            parseFloat(state.totalPrice) + parseFloat(state.cart[ind].precio)
          ).toFixed(2), // UPDATE total price of CART
        };
      }
      return {
        // If NOT in Shopping CART, Add it
        ...state,
        cart: [...state.cart, action.payload],
        count: state.count + 1, // UPDATE total Item Count in CART
        totalPrice: (
          parseFloat(state.totalPrice) + parseFloat(action.payload.precio)
        ).toFixed(2), // UPDATE total price of CART
      };
    case DELETE_ONE_QUANTITY_FROM_CART:
      let index = state.cart.findIndex(
        (item) => item.pid === action.payload.pid
      );
      // If After Delete One Quantity, it becomes '0', Remove PRODUCT from CART
      if (state.cart[index].cantidad === action.payload.cantidad)
        return {
          ...state,
          cart: state.cart.filter((item) => item.pid !== action.payload.pid),
          count: state.count - 1,
          totalPrice: (
            parseFloat(state.totalPrice) - parseFloat(state.cart[index].precio)
          ).toFixed(2), // UPDATE total price of CART
        };
      // Otherwise => remove one quantity for pid
      state.cart[index].cantidad = action.payload.cantidad;
      return {
        ...state,
        cart: [...state.cart],
        count: state.count - 1,
        totalPrice: (
          parseFloat(state.totalPrice) - parseFloat(state.cart[index].precio)
        ).toFixed(2), // UPDATE total price of CART
      };
    case DELETE_PRODUCT_FROM_CART:
      let i = state.cart.findIndex((item) => item.pid === action.payload.pid);
      return {
        ...state,
        cart: state.cart.filter((item) => item.pid !== action.payload.pid),
        count: state.count - action.payload.cantidad,
        totalPrice: (
          state.totalPrice -
          parseFloat(state.cart[i].cantidad).toFixed(2) *
            parseFloat(state.cart[i].precio).toFixed(2)
        ).toFixed(2),
      };
    case DELETE_PRODUCT:
      let updateCount = state.count;
      let updateTotalPrice = state.totalPrice;
      state.cart.forEach((item) => {
        if (item.pid === action.payload) {
          updateCount -= item.cantidad;
          updateTotalPrice -= item.cantidad * item.precio;
        }
      });
      return {
        ...state,
        cart: state.cart.filter((item) => item.pid !== action.payload),
        count: updateCount,
        totalPrice: parseFloat(updateTotalPrice).toFixed(2),
      };
    default:
      return state;
  }
}
