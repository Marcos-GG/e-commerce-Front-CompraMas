import { GET_CATEGORY, GET_GENDER } from "../actionsTypes/CategoryGender";

const initialState = {
  category: [],
  gender: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY: {
      return { ...state, category: action.payload };
    }

    case GET_GENDER: {
      return { ...state, gender: action.payload };
    }

    default:
      return { ...state };
  }
};

export default reducer;
