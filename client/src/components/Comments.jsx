import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { allComments } from "../Redux/actions/CommentsAction";

const Comments = () => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.comments);

  useEffect(() => {
    dispatch(allComments());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <p>commentario: {comment.text}</p>
            <p>
              quien hizo la pregunta: {comment.User.name}{" "}
              {comment.User.lastname}
            </p>
            <h3>Respuestas al comentario</h3>
            {comment.Answers.length ? (
              comment.Answers.map((answer) => (
                <div key={answer.id}>
                  <p>{answer.answer}</p>
                  <p>
                    quien hizo la respuesta: {answer.User.name}
                    {answer.User.lastname}
                  </p>
                </div>
              ))
            ) : (
              <p>No tiene respuestas</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Comments;
