import axios from "axios";

import { GET_USERS } from "../actionsTypes/UsersActionTypes";

export const getUsers = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:58968/users`);
      const Users = response.data;

      const users = Users.map((user) => ({
        id: user.id,
        name: user.name,
        lastname: user.lastname,
      }));

      dispatch({ type: GET_USERS, payload: users });
    } catch (error) {
      return error;
    }
  };
};
