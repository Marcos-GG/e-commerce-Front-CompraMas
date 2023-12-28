import axios from "axios";

import { ALL_COMMENTS } from "../actionsTypes/CommentsTypes";

export const allComments = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:13050/comments");

      dispatch({ type: ALL_COMMENTS, payload: response.data });
    } catch (error) {
      return error;
    }
  };
};
