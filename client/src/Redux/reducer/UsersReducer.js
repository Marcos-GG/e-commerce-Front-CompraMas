import { POST_USERS, GET_USERS } from "../actionsTypes/LoginRegisterTypes";

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
