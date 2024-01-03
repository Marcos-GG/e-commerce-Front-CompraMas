import axios from "axios";
import { configureHeaders } from "../auth/configureHeaders";

import { ALL_COMMENTS, POST_COMMENTS } from "../actionsTypes/CommentsTypes";

export const allComments = () => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      const response = await axios.get(
        "http://localhost:13050/comments",
        config
      );

      dispatch({ type: ALL_COMMENTS, payload: response.data });
    } catch (error) {
      return error;
    }
  };
};

export const postComment = (form, token, productId) => {
  return async function (dispatch) {
    try {
      const config = configureHeaders(token);
      const body = { ...form, productId };
      const response = await axios.post(
        "http://localhost:13050/comments",
        body,
        config
      );

      dispatch({ type: POST_COMMENTS, payload: response.data });
    } catch (error) {
      return error.message;
    }
  };
};
