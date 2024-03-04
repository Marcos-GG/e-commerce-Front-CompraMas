import axios from "axios";

import { POST_USERS, LOGIN } from "../actionsTypes/LoginRegisterTypes";
import { ERROR, SUCCESS } from "../actionsTypes/ProductsActionTypes";

export const postUsers = (form) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LOCALHOST}register`,
        form
      );
      if (response.status === 200)
        dispatch({ type: SUCCESS, payload: "Usuario creado correctamente." });

      dispatch({ type: POST_USERS, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR, payload: error.response.data.error });
      return error;
    }
  };
};

export const postLogin = (form) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LOCALHOST}login`,
        form
      );

      const user = response.data.token.user;
      console.log(response, "response 200");
      if (response.status === 200) {
        dispatch({ type: SUCCESS, payload: `Hola ${user}. Bienvenido!` });
      }
      dispatch({ type: LOGIN, payload: response.data });
    } catch (error) {
      console.log(error.response.data, "data");
      dispatch({ type: ERROR, payload: error.response.data.error });
      return error;
    }
  };
};
