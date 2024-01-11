import axios from "axios";
import { configureHeaders } from "../auth/configureHeaders";

import { ALL_COMMENTS } from "../actionsTypes/CommentsTypes";
import {
  POST_COMMENT_PRODUCT_ID,
  POST_ANSWER_PRODUCT_ID,
} from "../actionsTypes/ProductsActionTypes";

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

      dispatch({ type: POST_COMMENT_PRODUCT_ID, payload: response.data });
    } catch (error) {
      return error.message;
    }
  };
};

export const postAnswer = (form, commentId) => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      const body = { ...form, commentId };

      const response = await axios.post(
        "http://localhost:13050/answer",
        body,
        config
      );

      dispatch({ type: POST_ANSWER_PRODUCT_ID, payload: response.data });
    } catch (error) {
      return error.message;
    }
  };
};
