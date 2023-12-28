import axios from "axios";

import { GET_CATEGORY, GET_GENDER } from "../actionsTypes/CategoryGender";

export const getCategory = () => {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:13050/categories");

    dispatch({ type: GET_CATEGORY, payload: response.data });
  };
};

export const getGender = () => {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:13050/gender");

    dispatch({ type: GET_GENDER, payload: response.data });
  };
};
