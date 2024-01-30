import axios from "axios";
import { configureHeaders } from "../auth/configureHeaders";

import { GET_CATEGORY, GET_GENDER } from "../actionsTypes/CategoryGender";

export const getCategory = () => {
  return async function (dispatch) {
    const config = configureHeaders();
    const response = await axios.get(
      "http://localhost:55878/categories",
      config
    );

    dispatch({ type: GET_CATEGORY, payload: response.data });
  };
};

export const getGender = () => {
  return async function (dispatch) {
    const config = configureHeaders();

    const response = await axios.get("http://localhost:55878/gender", config);

    dispatch({ type: GET_GENDER, payload: response.data });
  };
};
