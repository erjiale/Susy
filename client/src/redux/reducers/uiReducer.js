import {
  OPEN_LOGIN,
  OPEN_REGISTER,
  CLOSE_LOGIN,
  CLOSE_REGISTER,
  OPEN_CART,
  CLOSE_CART,
  SET_ERRORS,
  CLEAR_ERRORS,
  REGISTER_SUCCESS,
  SET_USER,
  VERIFY_USER,
} from "../types";

const initialState = {
  openLogin: false,
  openRegister: false,
  openCart: false,
  errors: null,
  registerSuccess: false,
  verifySuccess: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case OPEN_LOGIN:
      return {
        ...state,
        openLogin: true,
      };
    case OPEN_REGISTER:
      return {
        ...state,
        openRegister: true,
      };
    case CLOSE_LOGIN:
      return {
        ...state,
        openLogin: false,
      };
    case CLOSE_REGISTER:
      return {
        ...state,
        openRegister: false,
      };
    case OPEN_CART:
      return {
        ...state,
        openCart: true,
      };
    case CLOSE_CART:
      return {
        ...state,
        openCart: false,
      };
    case SET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerSuccess: true,
      };
    case SET_USER: {
      return {
        ...state,
        registerSuccess: false,
        verifySuccess: false,
      };
    }
    case VERIFY_USER: {
      return {
        ...state,
        verifySuccess: true,
      };
    }
    default:
      return state;
  }
}
