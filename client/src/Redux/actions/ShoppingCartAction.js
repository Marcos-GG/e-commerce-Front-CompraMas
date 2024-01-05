import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
} from "../actionsTypes/ShoppingCartActionTypes";

export const addProduct = (product) => {
  return async function (dispatch) {
    dispatch({ type: ADD_PRODUCT, payload: product });
  };
};

export const removeProduct = (product) => {
  return async function (dispatch) {
    dispatch({ type: REMOVE_PRODUCT, payload: product });
  };
};
