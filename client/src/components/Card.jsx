/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../Redux/actions/ShoppingCartAction";
import { addLike, removeLike } from "../Redux/actions/Likes";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function Card({ product }) {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);

  const handleClickAdd = () => {
    dispatch(addProduct(product));
  };

  const handleClickLike = () => {
    if (!liked) {
      dispatch(addLike(product?.id));

      setLiked(true);
    } else {
      dispatch(removeLike(product?.id));
      setLiked(false);
    }
  };

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        margin: "10px",
        width: "12rem",
        height: "15rem",
        position: "relative",
        cursor: "pointer",
        transition: "0.1s",
        boxShadow: 6,
        borderRadius: "4px",
        "&:hover": {
          boxShadow: 8,
          transition: "0.1s",
          transform: "scale(1.002)",
        },
      }}
      onClick={() => navigate(`/detail/${product?.id}`)}
    >
      <Box p={2} sx={{}}>
        <Box
          width={1}
          height="8rem"
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img src="https://placehold.co/158x128" alt={product?.title} />
        </Box>
        <Box mt={1}>
          <Typography
            variant="h6"
            title={product?.title}
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: "23px",
            }}
          >
            {product?.title}
          </Typography>
          <Typography
            variant="subtitle1"
            title={product?.title}
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontWeight: 700,
            }}
          >
            ${product?.price}
          </Typography>
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: "-12px",
            right: "10px",
            display: "flex",
            gap: 2,
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              border: "1px solid black",
              borderRadius: "5px",
              boxShadow: 2,
              p: 0.2,
              cursor: "pointer",
              "&:hover": {
                boxShadow: 3,
              },
            }}
            onClick={(e) => {
              e.stopPropagation(); // esto previene que al hacer click en like redireccione a la pagina del producto.
              handleClickLike(product?.id);
            }}
          >
            {liked ? (
              <ThumbUpAltIcon
                sx={{
                  verticalAlign: "middle",
                }}
              />
            ) : (
              <ThumbUpOffAltIcon
                sx={{
                  verticalAlign: "middle",
                }}
              />
            )}
          </Box>
          <Box
            sx={{
              backgroundColor: "white",
              border: "1px solid black",
              borderRadius: "5px",
              boxShadow: 2,
              p: 0.2,
              cursor: "pointer",
              "&:hover": {
                boxShadow: 3,
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleClickAdd(product);
            }}
          >
            <AddShoppingCartIcon
              sx={{
                verticalAlign: "middle",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Card;
