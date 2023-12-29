import { LOGIN } from "../actionsTypes/LoginRegisterTypes";

const initialState = {
  token: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return { ...state, token: action.payload };
    }

    default:
      return { ...state };
  }
};

export default reducer;
