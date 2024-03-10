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
  LENGTH_PRODUCTS,
  SUCCESS,
  ERROR,
} from "../actionsTypes/ProductsActionTypes";

export const getProducts = (page) => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}products?page=${page}`,

        config
      );
      const products = response.data.products;
      const totalProducts = response.data.totalProducts;

      console.log(response.data, "response.data");

      dispatch({ type: GET_PRODUCTS, payload: products });
      dispatch({ type: LENGTH_PRODUCTS, payload: totalProducts });
    } catch (error) {
      return error;
    }
  };
};

export const getProductId = (id) => {
  return async function (dispatch) {
    const config = configureHeaders();
    const response = await axios.get(
      `${import.meta.env.VITE_LOCALHOST}products/${id}`,
      config
    );
    dispatch({ type: GET_PRODUCT_ID, payload: response.data });
  };
};

export const getTermProducts = (string, page) => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      const response = await axios.get(
        `${
          import.meta.env.VITE_LOCALHOST
        }products?search=${string}&page=${page}`,
        config
      );
      console.log(response.data);
      const products = response.data.products;
      const productosFiltrados = response.data.productosFiltrados;

      dispatch({ type: GET_TERM_PRODUCTS, payload: products });
      dispatch({ type: LENGTH_PRODUCTS, payload: productosFiltrados });
    } catch (error) {
      return error;
    }
  };
};

export const putProduct = (id, product, shouldMoveTo) => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      const response = await axios.put(
        `${import.meta.env.VITE_LOCALHOST}products/${id}`,
        product,
        config
      );

      if (response.status === 200) {
        if (shouldMoveTo) {
          if (shouldMoveTo === "false") {
            dispatch({ type: MOVE_TO_DEACTIVATE, payload: id });
            dispatch({
              type: SUCCESS,
              payload: "Producto desactivado.",
            });
          } else {
            dispatch({ type: MOVE_TO_ACTIVE, payload: id });
            dispatch({
              type: SUCCESS,
              payload: "Producto activado.",
            });
          }
        } else {
          dispatch({ type: SUCCESS, payload: "Actualizado correctamente" });
        }
      }

      dispatch({ type: PUT_PRODUCT, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR, payload: "No se actualizo la información." });
    }
  };
};

export const createProduct = (product) => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();

      const response = await axios.post(
        `${import.meta.env.VITE_LOCALHOST}createProduct`,
        product,
        config
      );
      if (response.status === 200) {
        dispatch({ type: SUCCESS, payload: "Producto creado correctamente." });
      }
      dispatch({ type: CREATE_PRODUCT, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR, payload: error.response.data.error });
      return error;
    }
  };
};

export const apllyFilters = (combinedFilters) => {
  return async function (dispatch) {
    const config = configureHeaders();

    const response = await axios.post(
      `${import.meta.env.VITE_LOCALHOST}filters`,
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
