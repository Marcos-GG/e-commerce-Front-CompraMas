import { POST_USERS } from "../actionsTypes/LoginRegisterTypes";
import { GET_USERS } from "../actionsTypes/UsersActionTypes";

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

    default:
      return { ...state };
  }
};

export default reducer;
