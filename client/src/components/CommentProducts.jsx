import { useState } from "react";
import { useDispatch } from "react-redux";
import { postComment } from "../Redux/actions/CommentsAction";
import { Box, Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

// eslint-disable-next-line react/prop-types
const CommentProducts = ({ productId }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    text: "",
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

    if (form.text.trim() === "") {
      return;
    }

    dispatch(postComment(form, token, productId));

    setForm({ text: "" });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          maxHeight: "3.6rem",
          margin: "10px",
          justifyContent: "space-between",
        }}
      >
        <TextField
          type="text"
          name="text"
          value={form.text}
          onChange={formHandler}
          multiline
          maxRows={2}
          fullWidth
          sx={{
            overflow: "hidden",
            width: "91%",
            ml: "5px",
          }}
        />
        <Button
          sx={{
            borderRadius: "10px",
            bgcolor: "white",
            border: "2px solid #F5F5F5",
          }}
          type="submit"
          variant="text"
          endIcon={<SendIcon sx={{ mr: "9px" }} />}
        ></Button>
      </form>
    </Box>
  );
};

export default CommentProducts;
