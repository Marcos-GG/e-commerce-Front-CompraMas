import axios from "axios";
import { configureHeaders } from "../auth/configureHeaders";

import { GET_USERS } from "../actionsTypes/UsersActionTypes";

export const getUsers = () => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      const response = await axios.get(`http://localhost:13050/users`, config);
      const Users = response.data;

      const users = Users.map((user) => ({
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        active: user.active,
      }));

      dispatch({ type: GET_USERS, payload: users });
    } catch (error) {
      return error;
    }
  };
};
