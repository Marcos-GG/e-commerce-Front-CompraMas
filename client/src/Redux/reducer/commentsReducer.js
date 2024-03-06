import { ALL_COMMENTS } from "../actionsTypes/CommentsTypes.js";

const initialState = {
  comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_COMMENTS: {
      return { ...state, comments: action.payload }; // Reemplaza los comentarios existentes con los nuevos
    }

    default:
      return { ...state };
  }
};

export default reducer;
