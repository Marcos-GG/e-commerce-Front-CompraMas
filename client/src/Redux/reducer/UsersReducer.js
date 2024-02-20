import { POST_USERS } from "../actionsTypes/LoginRegisterTypes";
import {
  GET_USERS,
  BLOCK_USER,
  UNLOCK_USER,
  DELETE_USER,
} from "../actionsTypes/UsersActionTypes";

const initialState = {
  users: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS: {
      return { ...state, users: action.payload };
    }

    case POST_USERS: {
      return { ...state, users: [action.payload, ...state.users] };
    }

    case BLOCK_USER: {
      const updatedUser = state.users.map((user) => {
        if (user.id === action.payload.id) {
          return { ...user, active: 0 };
        }
        return user;
      });

      return { ...state, users: updatedUser };
    }

    case UNLOCK_USER: {
      const updatedUser = state.users.map((user) => {
        if (user.id === action.payload.id) {
          return { ...user, active: 1 };
        }

        return user;
      });

      return { ...state, users: updatedUser };
    }

    case DELETE_USER: {
      console.log(action.payload, "payload");
      const usuariosSinEliminar = state.users.filter(
        (user) => user.id !== action.payload.id
      );
      return { ...state, users: usuariosSinEliminar };
    }

    default:
      return { ...state };
  }
};

export default reducer;
