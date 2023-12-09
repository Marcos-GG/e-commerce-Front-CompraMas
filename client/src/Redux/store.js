import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import productsReducer from "./reducer/productsReducer";

const rootReducer = combineReducers({
  products: productsReducer,
});

// quien va a ser el compose           // extension               || compose
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunkMiddleware))
  // cuando creemos el store vamos a usar el compone para aplicarle el middleware thunkMiddleware
  // thunkmiddleware me rpermite hacer las request
);

export default store;
