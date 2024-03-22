import { ALL_COMMENTS, POST_ANSWER } from "../actionsTypes/CommentsTypes.js";

const initialState = {
  comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_COMMENTS: {
      return { ...state, comments: action.payload }; // Reemplaza los comentarios existentes con los nuevos
    }
    case POST_ANSWER: {
      console.log(action.payload);

      console.log(state);

      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (action.payload.Comment.id == comment.id) {
            console.log("asdasdasd");
            return {
              ...comment,
              Answers: [...comment.Answers, action.payload],
            };
          } else {
            return comment;
          }
        }),
      };
    }

    default:
      return { ...state };
  }
};

export default reducer;
