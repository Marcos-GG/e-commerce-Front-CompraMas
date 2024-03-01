import axios from "axios";

import { ADD_LIKE, REMOVE_LIKE } from "../actionsTypes/LikesTypes";
import { configureHeaders } from "../auth/configureHeaders";
import { SET_FAVORITES } from "../actionsTypes/ProductsActionTypes";

export const addLike = (productId) => {
  return async function (dispatch) {
    const config = configureHeaders();
    const response = await axios.post(
      "${import.meta.env.VITE_LOCALHOST}likes",
      { productId },
      config
    );

    dispatch({ type: ADD_LIKE, payload: response.data });
  };
};

export const removeLike = (productId) => {
  return async function (dispatch) {
    const config = configureHeaders();
    const response = await axios.put(
      "${import.meta.env.VITE_LOCALHOST}likes",
      { productId },
      config
    );

    dispatch({ type: REMOVE_LIKE, payload: response.data });
  };
};

export const getFavorites = () => {
  return async function (dispatch) {
    const config = configureHeaders();
    const response = await axios.get(
      "${import.meta.env.VITE_LOCALHOST}likes/getFavorites",
      config
    );

    const ProductosFavoritos = response.data.map((like) => like.Product);

    dispatch({ type: SET_FAVORITES, payload: ProductosFavoritos });
  };
};
