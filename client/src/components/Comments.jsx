/* eslint-disable react/prop-types */
import AnswerComment from "./AnswerComment";
import { Box } from "@mui/material";

const Comments = ({ comments }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "35rem", bgcolor: "beige" }}>
        {comments.map((comment) => (
          <Box key={comment.id} sx={{ display: "flex", bgcolor: "green" }}>
            <p>{comment?.Answers?.slice(-1)[0]?.answer}</p>
          </Box>
        ))}
      </Box>
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
    </Box>
  );
};

export default Comments;
