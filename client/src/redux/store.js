import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"; // store-enhancer/middleware
// Import REDUCERS
import productReducer from "./reducers/productReducer";
import userReducer from "./reducers/userReducer";
import uiReducer from "./reducers/uiReducer";
import shoppingCartReducer from "./reducers/shoppingCartReducer";

const initialState = {};
const middleware = [thunk];

const reducers = combineReducers({
  // this is the actual state
  user: userReducer,
  ui: uiReducer,
  products: productReducer,
  cart: shoppingCartReducer,
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // compose() to use Redux DEVTOOLS chrome extension
  )
);

export default store;
