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
      return { ...state, comments: action.payload }; // Reemplaza los comentarios existentes con los nuevos
    }

    case POST_COMMENTS: {
      return { ...state, comments: [action.payload, ...state.comments] }; // Agrega el nuevo comentario al principio de la lista
    }

    case POST_ANSWER_COMMENT_ID: {
      const commentId = action.payload.commentId;
      // Actualiza los comentarios con la nueva respuesta
      const updatedComments = state.comments.map((comment) => {
        if (comment.id === commentId) {
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
