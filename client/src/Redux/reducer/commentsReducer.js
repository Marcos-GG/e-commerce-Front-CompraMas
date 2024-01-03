import { ALL_COMMENTS, POST_COMMENTS } from "../actionsTypes/CommentsTypes.js";

const initialState = {
  comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_COMMENTS: {
      return { ...state, comments: action.payload };
    }

    case POST_COMMENTS: {
      return { ...state, comments: [...state.comments, action.payload] };
    }

    default:
      return { ...state };
  }
};

export default reducer;
