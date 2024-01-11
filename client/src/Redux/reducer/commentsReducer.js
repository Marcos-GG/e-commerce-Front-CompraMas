import {
  ALL_COMMENTS,
  POST_COMMENTS,
  POST_ANSWER_COMMENT_ID,
} from "../actionsTypes/CommentsTypes.js";

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

    case POST_ANSWER_COMMENT_ID: {
      const commentId = action.payload.commentId;

      // encontramos el comentario especifico para agregarle answer
      const updatedComments = state.comments.map((comment) => {
        if (comment.id === commentId) {
          // actualizamos Answers y le agregamos el nuevo
          return {
            ...comment,
            Answers: [...comment.Answers, action.payload],
          };
        }
        return comment;
      });

      return {
        ...state,
        comments: updatedComments,
      };
    }

    default:
      return { ...state };
  }
};

export default reducer;
