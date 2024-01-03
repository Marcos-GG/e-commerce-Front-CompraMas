import axios from "axios";

import { POST_USERS, LOGIN } from "../actionsTypes/LoginRegisterTypes";

export const postUsers = (form) => {
  return async function (dispatch) {
    console.log(form, "como llega la info para crear un usuario");
    try {
      const response = await axios.post(
        `http://localhost:13050/register`,
        form
      );
      console.log(response.data, "respuesta del back al crear un usuario");
      dispatch({ type: POST_USERS, payload: response.data });
    } catch (error) {
      return error;
    }
  };
};

export const postLogin = (form) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`http://localhost:13050/login`, form);

      console.log(response.data, "llega la info del back/login");
      dispatch({ type: LOGIN, payload: response.data });
    } catch (error) {
      return error;
    }
  };
};
