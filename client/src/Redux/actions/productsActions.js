import axios from "axios";

import {
  GET_PRODUCTS,
  GET_PRODUCT_ID,
} from "../actionsTypes/ProductsActionTypes";

export const getProducts = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:58968/products");

      dispatch({ type: GET_PRODUCTS, payload: response.data });
    } catch (error) {
      return error;
    }
  };
};

export const getProductId = (id) => {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:58968/products/${id}`);

    dispatch({ type: GET_PRODUCT_ID, payload: response.data });
  };
};
