import { useState } from "react";
import { useDispatch } from "react-redux";
import { postAnswer } from "../Redux/actions/CommentsAction";

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

    setForm({ answer: "" });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="answer"
          value={form.answer}
          onChange={formHandler}
        />
        <div>
          <input type="submit" value="responder" />
        </div>
      </form>
    </>
  );
};

export default AnswerComment;
