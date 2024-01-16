import axios from "axios";
import { configureHeaders } from "../auth/configureHeaders";

import {
  GET_PRODUCTS,
  GET_PRODUCT_ID,
  PUT_PRODUCT,
  MOVE_TO_ACTIVE,
  MOVE_TO_DEACTIVATE,
  CREATE_PRODUCT,
  PRODUCT_FILTERED,
} from "../actionsTypes/ProductsActionTypes";

export const getProducts = () => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      const response = await axios.get(
        "http://localhost:13050/products",
        config
      );
      const products = response.data;

      dispatch({ type: GET_PRODUCTS, payload: products });
    } catch (error) {
      return error;
    }
  };
};

export const getProductId = (id) => {
  return async function (dispatch) {
    const config = configureHeaders();
    const response = await axios.get(
      `http://localhost:13050/products/${id}`,
      config
    );
    dispatch({ type: GET_PRODUCT_ID, payload: response.data });
  };
};

export const putProduct = (id, product) => {
  return async function (dispatch) {
    const config = configureHeaders();
    const response = await axios.put(
      `http://localhost:13050/products/${id}`,
      product,
      config
    );

    dispatch({ type: PUT_PRODUCT, payload: response.data });
  };
};

export const moveToActive = (id) => {
  return function (dispatch) {
    dispatch({ type: MOVE_TO_ACTIVE, payload: id });
  };
};

export const moveToDeactivate = (id) => {
  return function (dispatch) {
    dispatch({ type: MOVE_TO_DEACTIVATE, payload: id });
  };
};

export const createProduct = (product) => {
  return async function (dispatch) {
    const config = configureHeaders();

    const response = await axios.post(
      `http://localhost:13050/createProduct`,
      product,
      config
    );

    dispatch({ type: CREATE_PRODUCT, payload: response.data });
  };
};

export const applyFilter = (filtro) => {
  return function (dispatch) {
    dispatch({ type: PRODUCT_FILTERED, payload: filtro });
  };
};
