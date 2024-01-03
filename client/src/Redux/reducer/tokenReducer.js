import { LOGIN } from "../actionsTypes/LoginRegisterTypes";

const initialState = {
  token: null,
  admin: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      const admin = action.payload.token.admin;
      const token = action.payload.token.token;
      if (action.payload.token.admin) localStorage.setItem("admin", admin);
      localStorage.setItem("token", token);

      return {
        ...state,
        token: token,
        admin: admin,
      };
    }

    default:
      return { ...state };
  }
};

export default reducer;
