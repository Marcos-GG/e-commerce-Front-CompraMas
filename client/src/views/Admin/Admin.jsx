/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Comments from "../../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { ALL_COMMENTS } from "../../Redux/actionsTypes/CommentsTypes";
import { allComments } from "../../Redux/actions/CommentsAction";
import { Box } from "@mui/material";

const Admin = () => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.comments);
  const productId = useSelector((state) => state.products.productId);
  console.log(productId, "se actualizo correctamente la nueva resusta");

  console.log(comments);

  useEffect(() => {
    const persistedData = localStorage.getItem("persist:root");

    if (persistedData) {
      const parsedData = JSON.parse(persistedData);

      const localComments =
        parsedData.comments && JSON.parse(parsedData.comments).comments;

      if (localComments || localComments.length > 0) {
        if (!comments || comments.length === 0) {
          dispatch({ type: ALL_COMMENTS, payload: localComments });
        }
      }
    }

    dispatch(allComments());
  }, []);

  return (
    <Box
      sx={
        // cuando son las resoluciones mas chicas tengo que comentar todo para que ocupe el 100% sin scroll porque quiero ver solo los mns para responder
        {
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          // bgcolor: "red",
          // height: "53rem",
        }
      }
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url("/fondoChat.jpg")`, // URL de la imagen de fondo
          filter: "blur(3px)", // Aplicar desenfoque al fondo
          zIndex: -1,
        }}
      />
      <Comments comments={comments} />
    </Box>
  );
};

export default Admin;
