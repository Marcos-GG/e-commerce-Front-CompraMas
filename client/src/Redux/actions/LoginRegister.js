import axios from "axios";
import Cookies from "js-cookie";

import { POST_USERS, LOGIN } from "../actionsTypes/LoginRegisterTypes";

export const postUsers = (form) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`http://localhost:13050/users`, form);

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
      // Almacena el token en una cookie segura con js-cookie
      Cookies.set("token", response.data.token, { expires: 1, secure: true });

      dispatch({ type: LOGIN, payload: response.data });
    } catch (error) {
      return error;
    }
  };
};
