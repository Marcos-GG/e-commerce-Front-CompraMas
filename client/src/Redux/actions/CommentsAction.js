import axios from "axios";

import { ALL_COMMENTS } from "../actionsTypes/CommentsTypes";

export const allComments = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:58968/comments");

      dispatch({ type: ALL_COMMENTS, payload: response.data });
    } catch (error) {
      return error;
    }
  };
};
