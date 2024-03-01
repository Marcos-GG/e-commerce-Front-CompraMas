import axios from "axios";

import { POST_USERS, LOGIN } from "../actionsTypes/LoginRegisterTypes";

export const postUsers = (form) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DB_PORT}register`,
        form
      );

      dispatch({ type: POST_USERS, payload: response.data });
    } catch (error) {
      return error;
    }
  };
};

export const postLogin = (form) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DB_PORT}login`,
        form
      );

      if (response.data.error) {
        // alert para avisar que el usuario esta ban
        return window.alert(response.data.error);
      }

      dispatch({ type: LOGIN, payload: response.data });
    } catch (error) {
      return window.alert("Ocurrio un error inesperado");
    }
  };
};
