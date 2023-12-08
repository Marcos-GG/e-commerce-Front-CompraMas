import axios from "axios";

import { GET_PRODUCTS } from "./acionsTypes/ProductsActionTypes";

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
