/* eslint-disable react/prop-types */
import { Box, Divider, IconButton, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const CommentDesplegable = ({ productId, userId }) => {
  console.log(productId, "isAdmin");
  const [expandedCommentId, setExpandedCommentId] = useState(null);

  const toggleExpandedComment = (commentId) => {
    if (expandedCommentId === commentId) {
      setExpandedCommentId(null);
    } else {
      setExpandedCommentId(commentId);
    }
  };

  return (
    <Box>
      {productId?.Comments && productId.Comments.length > 0 ? (
        <Box
          sx={{
            ml: "20px",
            height: "25rem",
            boxShadow: "10px 10px 15px #888888",
            mb: "3rem",
            width: "60rem",
          }}
        >
          <Typography
            variant="h5"
            sx={{ letterSpacing: "0.1em", m: "10px 0 10px 10px" }}
          >
            Comentarios de la comunidad
          </Typography>
          <Box sx={{ overflow: "auto", maxHeight: "87%" }}>
            {productId.Comments.map((comment) => (
              <Box key={comment.id}>
                {comment.userId !== userId && (
                  <Box
                    sx={{
                      mx: "30px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1px",
                      }}
                    >
                      <Box sx={{ height: "20px" }}>
                        <Typography
                          variant="p"
                          sx={{
                            fontSize: "12.3px",
                            fontWeight: "bold",
                            color: "gray",
                          }}
                        >
                          {comment?.User?.name} {comment?.User?.lastname}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          height: "22px",
                          ml: "5px",
                        }}
                      >
                        <Typography>{comment.text}</Typography>
                        <IconButton
                          onClick={() => toggleExpandedComment(comment.id)}
                          aria-label="show answers"
                        >
                          <ExpandMoreIcon />
                        </IconButton>
                      </Box>
                    </Box>

                    {comment.Answers && comment.Answers.length > 0 && (
                      <Box
                        sx={{
                          bgcolor: "#F5F5F5",
                          display: "flex",
                          flexDirection: "column",
                          overflow: "auto",
                          maxHeight:
                            expandedCommentId === comment.id ? "9.5rem" : null,
                        }}
                      >
                        {expandedCommentId === comment.id && (
                          <Box sx={{ textAlign: "end", mr: "10px" }}>
                            <Typography
                              variant="p"
                              sx={{
                                fontSize: "12.3px",
                                fontWeight: "bold",
                                color: "gray",
                              }}
                            >
                              admin
                            </Typography>
                          </Box>
                        )}
                        {expandedCommentId === comment.id &&
                          comment.Answers.map((answer) => (
                            <Box
                              key={answer.id}
                              sx={{
                                alignSelf: answer.User.admin ? "end" : "start",
                                textAlign: answer.User.admin ? "end" : "start",
                                mx: "15px",
                                width: "35%",
                              }}
                            >
                              <Typography>{answer.answer}</Typography>
                            </Box>
                          ))}
                      </Box>
                    )}
                    <Divider sx={{ width: "90%", m: "auto", mt: "10px" }} />
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        <p>No hay comentarios para este producto. ¡Sé el primero!</p>
      )}
    </Box>
  );
};

export default CommentDesplegable;
