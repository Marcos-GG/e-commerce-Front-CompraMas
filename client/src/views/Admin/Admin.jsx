import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { allComments } from "../../Redux/actions/CommentsAction";

function Admin() {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.commments);
  console.log(comments, "admin");

  useEffect(() => {
    dispatch(allComments());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>Panel del admin</h1>
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
                    quien hizo la respues: {answer.User.name}
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
}

export default Admin;
