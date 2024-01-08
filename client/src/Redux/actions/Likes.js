import axios from "axios";

import { ADD_LIKE, REMOVE_LIKE } from "../actionsTypes/LikesTypes";
import { configureHeaders } from "../auth/configureHeaders";

export const addLike = (productId) => {
  return async function (dispatch) {
    console.log(productId, "como lo recibe el action");
    const config = configureHeaders();
    const response = await axios.post(
      "http://localhost:13050/likes",
      { productId },
      config
    );
    console.log(response.data, "respuesta");

    dispatch({ type: ADD_LIKE, payload: response.data });
  };
};

export const removeLike = (productId) => {
  return async function (dispatch) {
    console.log(productId, "como lo recibe el action");

    const config = configureHeaders();
    const response = await axios.put(
      "http://localhost:13050/likes",
      { productId },
      config
    );
    console.log(response.data, "respuesta");

    dispatch({ type: REMOVE_LIKE, payload: response.data });
  };
};
