import axios from "axios";
import { configureHeaders } from "../auth/configureHeaders";

import {
  GET_PRODUCTS,
  GET_PRODUCT_ID,
  PUT_PRODUCT,
  MOVE_TO_ACTIVE,
  MOVE_TO_DEACTIVATE,
  CREATE_PRODUCT,
  APPLY_FILTERS,
  CLEAR_FILTERED_PRODUCTS,
  GET_TERM_PRODUCTS,
} from "../actionsTypes/ProductsActionTypes";

export const getProducts = () => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      const response = await axios.get(
        "http://localhost:55878/products",
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
      `http://localhost:55878/products/${id}`,
      config
    );
    dispatch({ type: GET_PRODUCT_ID, payload: response.data });
  };
};

export const getTermProducts = (string) => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      const response = await axios.get(
        `http://localhost:55878/products?search=${string}`,
        config
      );
      const products = response.data;

      dispatch({ type: GET_TERM_PRODUCTS, payload: products });
    } catch (error) {
      return error;
    }
  };
};

export const putProduct = (id, product) => {
  return async function (dispatch) {
    const config = configureHeaders();
    const response = await axios.put(
      `http://localhost:55878/products/${id}`,
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
      `http://localhost:55878/createProduct`,
      product,
      config
    );

    dispatch({ type: CREATE_PRODUCT, payload: response.data });
  };
};

export const apllyFilters = (combinedFilters) => {
  return async function (dispatch) {
    const config = configureHeaders();

    const response = await axios.post(
      `http://localhost:55878/filters`,
      combinedFilters,
      config
    );

    dispatch({ type: APPLY_FILTERS, payload: response.data });
  };
};

export const clearProductosFiltrados = () => {
  return function (dispatch) {
    dispatch({ type: CLEAR_FILTERED_PRODUCTS });
  };
};
