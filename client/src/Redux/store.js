import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// reducers
import productsReducer from "./reducer/productsReducer";
import commentsReducer from "./reducer/commentsReducer";
import usersReducer from "./reducer/UsersReducer";
import categoryGenderReducer from "./reducer/categoryGenderReducer";
import tokenReducer from "./reducer/tokenReducer";

// persistConfig
const persistConfig = {
  key: "root",
  storage,
  whiteList: ["products"],
};

const rootReducer = combineReducers({
  products: productsReducer,
  comments: commentsReducer,
  users: usersReducer,
  categoryGender: categoryGenderReducer,
  token: tokenReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// quien va a ser el compose           // extension               || compose
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(thunk))
  // cuando creemos el store vamos a usar el compone para aplicarle el middleware thunkMiddleware
  // thunkmiddleware me rpermite hacer las request
);

export const persistor = persistStore(store);
