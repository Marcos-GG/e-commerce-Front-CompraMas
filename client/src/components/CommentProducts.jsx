import { useState } from "react";
import { useDispatch } from "react-redux";
import { postComment } from "../Redux/actions/CommentsAction";

// eslint-disable-next-line react/prop-types
const CommetProducts = ({ productId }) => {
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
    dispatch(postComment(form, token, productId));
    event.target.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text">comentario</label>
        <input
          type="text"
          name="text"
          value={form.text}
          onChange={formHandler}
        />
        <div>
          <input type="submit" value="comentar" />
        </div>
      </form>
    </>
  );
};

export default CommetProducts;
