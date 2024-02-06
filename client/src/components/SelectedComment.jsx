/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import AnswerComment from "./AnswerComment";

const SelectedComment = ({
  selectedComment,
  isLessThanOrEqual430,
  isLessThanOrEqual820,
  isLessThanOrEqual980,
  isLessThanOrEqual1268,
  isLessThanOrEqual1662,
  scrollContainerRef,
  userId,
  // setSelectedComment,
}) => {
  useEffect(() => {
    if (scrollContainerRef.current && selectedComment) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight; // Ajustar la posición de desplazamiento al final del contenedor
    }
  }, [selectedComment, scrollContainerRef]);

  return (
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
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
              gap: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                textAlign: "start",
                fontWeight: "bold",
              }}
            >
              {selectedComment.User.name || ""}{" "}
              {selectedComment.User.lastname || ""}
            </Typography>
            <Typography>{selectedComment.text}</Typography>
          </Box>

          {selectedComment.Answers.sort((a, b) => {
            if (a.createdAt < b.createdAt) return -1;
            else if (a.createdAt > b.createdAt) return 1;
            return 0;
          }).map((answer) => (
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
                  bgcolor: userId === answer.userId ? "#00CCFD" : "#F5F5F5",
                  width: "24rem",
                  borderRadius:
                    userId === answer.userId
                      ? "15px 15px 0px 15px;"
                      : "0 15px 15px 15px",
                  mx: "15px",
                  alignItems: "start",
                  flexDirection: "column",
                  padding: "10px",
                  my: "5px",
                  boxShadow: "10px 10px 15px #888888;",
                  gap: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "start",
                    fontWeight: "bold",
                  }}
                >
                  {answer.User.name || ""} {answer.User.lastname || ""}
                </Typography>
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
  );
};

export default SelectedComment;
