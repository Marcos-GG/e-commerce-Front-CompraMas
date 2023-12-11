import axios from "axios";

import {
  GET_PRODUCTS,
  GET_PRODUCT_ID,
} from "../actionsTypes/ProductsActionTypes";

export const getProducts = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:58968/products");
      const products = response.data;

      const Products = products.map((product) => ({
        id: product.id,
        category: product.category,
        gender: product.gender,
        image: product.image,
        likes: product.likes,
        price: product.price,
        status: product.status,
        title: product.title,
      }));

      dispatch({ type: GET_PRODUCTS, payload: Products });
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
