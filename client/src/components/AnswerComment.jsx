import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  postAnswer /* postAnswerAdmin  */,
} from "../Redux/actions/CommentsAction";
import { Box, Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

// eslint-disable-next-line react/prop-types
const AnswerComment = ({ commentId }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    answer: "",
  });

  const formHandler = (event) => {
    event.preventDefault();
    const campo = event.target.name;
    const value = event.target.value;

    setForm({
      ...form,
      [campo]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (form.answer.trim() === "") {
      return;
    }

    dispatch(postAnswer(form, commentId));
    // dispatch(postAnswerAdmin(form, commentId));

    setForm({ answer: "" });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          maxHeight: "3.5rem",
          margin: "10px",
          backgroundColor: "orange",
        }}
      >
        {/* <Box
          sx={{
            width: "100%",
            maxHeight: "3.5rem",
            overflow: "hidden",
          }}
        > */}
        <TextField
          type="text"
          name="answer"
          value={form.answer}
          onChange={formHandler}
          onKeyPress={handleKeyPress}
          multiline
          maxRows={2}
          fullWidth
          sx={{ overflow: "hidden" }}
        />
        {/* </Box> */}

        <Button type="submit" variant="text" endIcon={<SendIcon />}></Button>
      </form>
    </Box>
  );
};

export default AnswerComment;
