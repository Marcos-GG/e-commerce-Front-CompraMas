/* eslint-disable react/prop-types */
import AnswerComment from "./AnswerComment";
import UserAvatar from "./UserAvatar";
import { jwtDecode } from "jwt-decode";
import {
  Badge,
  Box,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import FormatoHora from "./FormatoHora";

const Comments = ({ comments }) => {
  const theme = useTheme();
  const isLessThanOrEqual430 = useMediaQuery(theme.breakpoints.down(430));
  const isLessThanOrEqual820 = useMediaQuery(theme.breakpoints.down(820));
  const isLessThanOrEqual980 = useMediaQuery(theme.breakpoints.down(980));
  const isLessThanOrEqual1268 = useMediaQuery(theme.breakpoints.down(1268));
  const isLessThanOrEqual1662 = useMediaQuery(theme.breakpoints.down(1662));

  const token = localStorage.getItem("token");
  const decodeToken = jwtDecode(token);
  const userId = decodeToken.id;

  const [selectedComment, setSelectedComment] = useState(null);
  const scrollContainerRef = useRef(null); // referencia al contenedor de scroll

  useEffect(() => {
    if (scrollContainerRef.current && selectedComment) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight; // Ajustar la posición de desplazamiento al final del contenedor
    }
  }, [selectedComment]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isLessThanOrEqual430 ? "" : "center",
        flexDirection: isLessThanOrEqual430 ? "column" : "row",
        mt: isLessThanOrEqual430 ? "" : "20px",
      }}
    >
      <Box
        sx={{
          width: isLessThanOrEqual430
            ? "100%"
            : isLessThanOrEqual980
            ? "20rem"
            : isLessThanOrEqual1268
            ? "20rem"
            : isLessThanOrEqual1662
            ? "28rem"
            : "33.5rem",
          minWidth: "20rem",
          background:
            "linear-gradient(0deg, rgba(1,46,84,1) 0%, rgba(0,205,254,1) 100%)",
          height:
            isLessThanOrEqual430 && !selectedComment
              ? `calc(100vh - 3.2rem)`
              : "45rem",
          borderRadius: isLessThanOrEqual430 ? "" : "20px 0 0 20px",
          overflow: "auto",
          boxShadow: "14px 10px 15px #888888;",
          display: isLessThanOrEqual430 && selectedComment ? "none" : "block",
        }}
      >
        {comments.map((comment) => (
          <Box
            key={comment.id}
            sx={{
              display: "flex",
              height: "4.5rem",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              paddingX: "10px",
              gap: "5px",
              position: "relative", // posición relative para que la línea divisoria pueda ser posicionada de forma absoluta
              "&:not(:last-child)": {
                marginBottom: "10px",
              },
            }}
            onClick={() => {
              setSelectedComment(comment);
            }}
          >
            <UserAvatar user={comment.User} />

            <Typography
              sx={{
                width: "21rem",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                marginLeft: "5px",
              }}
            >
              {comment?.Answers.length > 0
                ? comment?.Answers?.slice(-1)[0]?.answer
                : comment?.text}
            </Typography>

            <FormatoHora hora={comment.createdAt} />

            <Divider
              sx={{
                position: "absolute",
                bottom: "0", // posicionar la línea al fondo de la caja
                width: "86%", // que la línea ocupe el % del ancho de la caja
                marginLeft: "10%", // centrar la línea horizontalmente
              }}
            />
            <Badge color="secondary" variant="dot"></Badge>
          </Box>
        ))}
      </Box>
      <Box>
        {selectedComment ? (
          <Box
            sx={{
              width: isLessThanOrEqual430
                ? "100vw"
                : isLessThanOrEqual820
                ? "25rem"
                : isLessThanOrEqual980
                ? "30rem"
                : isLessThanOrEqual1268
                ? "40rem"
                : isLessThanOrEqual1662
                ? "50rem"
                : "68rem",
              height: isLessThanOrEqual430 ? `calc(100vh - 3.2rem)` : "45rem",
              borderRadius: isLessThanOrEqual430 ? "" : " 0 20px 20px 0 ",
              backgroundColor: "#f5f5f5",
              boxShadow: "10px 10px 15px #888888;",
              backgroundImage: 'url("/logoblanco.svg")',
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Box>
              <Box
                ref={scrollContainerRef}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "43rem",
                  maxHeight: isLessThanOrEqual430 ? "" : "40rem", // Establecer la altura máxima para activar el scroll
                  overflowY: "auto", // Habilitar el scroll vertical cuando el contenido excede la altura máxima
                }}
              >
                <Typography
                  sx={{
                    width: isLessThanOrEqual430
                      ? "17rem"
                      : isLessThanOrEqual1268
                      ? "18rem"
                      : "24rem",
                    borderRadius: "0 15px 15px 15px",
                    margin: "15px",
                    // margin: "4px",
                    padding: "10px",
                    border: "1px solid #00CCFD",
                    bgcolor: "#F5F5F5",
                    boxShadow: "10px 10px 15px #888888;",
                  }}
                >
                  {selectedComment.text}
                </Typography>

                {selectedComment.Answers.map((answer) => (
                  <Box
                    key={answer.id}
                    sx={{
                      display: "flex",
                      justifyContent:
                        userId === answer.userId ? "flex-end" : "flex-start",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        bgcolor:
                          userId === answer.userId ? "#00CCFD" : "#F5F5F5",
                        width: "24rem",
                        borderRadius:
                          userId === answer.userId
                            ? "15px 15px 0px 15px;"
                            : "0 15px 15px 15px",
                        mx: "15px",
                        justifyContent: "center",
                        padding: "10px",
                        my: "5px",
                        boxShadow: "10px 10px 15px #888888;",
                      }}
                    >
                      <Typography
                        sx={{
                          width: "100%",
                          display: "flex",
                          flexWrap: "wrap",
                          boxSizing: "border-box",
                        }}
                      >
                        {answer.answer}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <AnswerComment commentId={selectedComment.id} />
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: isLessThanOrEqual430 ? "none" : "block",
              width: isLessThanOrEqual430
                ? "100vw"
                : isLessThanOrEqual820
                ? "25rem"
                : isLessThanOrEqual980
                ? "30rem"
                : isLessThanOrEqual1268
                ? "40rem"
                : isLessThanOrEqual1662
                ? "50rem"
                : "68rem",
              height: "45rem",

              borderRadius: " 0 20px 20px 0 ",
              backgroundColor: "#F5F5F5",
              boxShadow: "10px 10px 15px #888888",
              backgroundImage: 'url("/logoblanco.svg")',
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Comments;
