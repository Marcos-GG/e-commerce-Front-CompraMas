import axios from "axios";

import { POST_USERS } from "../actionsTypes/LoginRegisterTypes";

export const postUsers = (form) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`http://localhost:58968/users`, form);

      dispatch({ type: POST_USERS, payload: response.data });
    } catch (error) {
      return error;
    }
  };
};
