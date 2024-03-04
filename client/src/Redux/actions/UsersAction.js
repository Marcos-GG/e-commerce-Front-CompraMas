import axios from "axios";
import { configureHeaders } from "../auth/configureHeaders";

import {
  GET_USERS,
  UNLOCK_USER,
  BLOCK_USER,
  DELETE_USER,
  GET_USERS_NAME,
} from "../actionsTypes/UsersActionTypes";
import { SUCCESS } from "../actionsTypes/ProductsActionTypes";

export const getUsers = () => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}users`,
        config
      );
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

export const blockUser = (user) => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      await axios.put(
        `${import.meta.env.VITE_LOCALHOST}users/${user.id}`,
        { active: 0 },
        config
      );
      dispatch({ type: SUCCESS, payload: "Usuario bloqueado." });
      dispatch({ type: BLOCK_USER, payload: user });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const unlockUser = (user) => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      await axios.put(
        `${import.meta.env.VITE_LOCALHOST}users/${user.id}`,
        { active: 1 },
        config
      );
      dispatch({ type: SUCCESS, payload: "Usuario Desbloqueado." });
      dispatch({ type: UNLOCK_USER, payload: user });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const deleteUser = (user) => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      await axios.delete(
        `${import.meta.env.VITE_LOCALHOST}users/${user.id}`,
        config
      );
      dispatch({ type: DELETE_USER, payload: user });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const getUsersName = (string) => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}users?search=${string}`,
        config
      );
      dispatch({ type: GET_USERS_NAME, payload: response.data });
    } catch (error) {
      return { error: error.message };
    }
  };
};
