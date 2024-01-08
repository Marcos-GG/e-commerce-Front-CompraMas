import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { allComments } from "../Redux/actions/CommentsAction";
import AnswerComment from "./AnswerComment";

const Comments = () => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.comments);
  const answer = useSelector((state) => state.comments.answer);

  useEffect(() => {
    dispatch(allComments());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, answer]);

  return (
    <div>
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <div style={{ border: "solid 2px", margin: "10px" }}>
              <p>commentario: {comment.text}</p>
              <p>
                quien hizo la pregunta: {comment && comment.User.name}{" "}
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
              <div>
                <p>Responder:</p>
                <AnswerComment commentId={comment.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
