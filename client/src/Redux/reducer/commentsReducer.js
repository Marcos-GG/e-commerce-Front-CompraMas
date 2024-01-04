import {
  ALL_COMMENTS,
  POST_COMMENTS,
  POST_ANSWER,
} from "../actionsTypes/CommentsTypes.js";

const initialState = {
  comments: [],
  answer: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_COMMENTS: {
      return { ...state, comments: action.payload };
    }

    case POST_COMMENTS: {
      return { ...state, comments: [...state.comments, action.payload] };
    }

    case POST_ANSWER: {
      return { ...state, answer: action.payload };
    }
    default:
      return { ...state };
  }
};

export default reducer;
