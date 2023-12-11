import { ALL_COMMENTS } from "../actionsTypes/CommentsTypes.js";

const initialState = {
  commments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_COMMENTS: {
      return { ...state, commments: action.payload };
    }

    default:
      return { ...state };
  }
};

export default reducer;
