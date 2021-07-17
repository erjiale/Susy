import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_USER } from "../types";

const initialState = {
  authenticated: false,
  email: "",
  username: "",
  isAdmin: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        ...state,
        authenticated: true,
        email: action.payload._id,
        username: action.payload.username,
        isAdmin: action.payload.isAdmin,
      };
    default:
      return state;
  }
}
