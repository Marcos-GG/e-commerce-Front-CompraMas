import { LOGIN } from "../actionsTypes/LoginRegisterTypes";

const initialState = {
  token: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      localStorage.setItem("token", action.payload.token);
      return { ...state, token: action.payload };
    }

    default:
      return { ...state };
  }
};

export default reducer;
