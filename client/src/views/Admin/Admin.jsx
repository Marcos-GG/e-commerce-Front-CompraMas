/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Comments from "../../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { allComments } from "../../Redux/actions/CommentsAction";
import { Box } from "@mui/material";

import Circularprogress from "../../components/CircularProgress";
import { getProductsAll } from "../../Redux/actions/productsActions";

const Admin = () => {
  const dispatch = useDispatch();
  const AllComments = useSelector((state) => state.comments.comments);

  useEffect(() => {
    dispatch(allComments());
    dispatch(getProductsAll());
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (AllComments !== null) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [AllComments]);

  return (
    <Box>
      {isLoading ? (
        <Circularprogress />
      ) : (
        <Box>
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
          <Comments comments={AllComments} />
        </Box>
      )}
    </Box>
  );
};

export default Admin;
