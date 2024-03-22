/* eslint-disable react/prop-types */
import { Box, Typography, useMediaQuery } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ProductPrice from "./ProductPrice";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductItem = ({
  productAdmin,
  product,
  handleClickAdd,
  handleClickLike,
  liked,
  navigate,
  priceStyle,
  handleProductClick,
}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [enDetail, setEnDetail] = useState(false);

  useEffect(() => {
    if (currentPath.includes("detail/")) {
      setEnDetail(true);
    }
  }, [currentPath, enDetail]);

  const isLTE321 = useMediaQuery("(max-width:321px)");
  const isLTE373 = useMediaQuery("(max-width:373px)");
  const isLTE426 = useMediaQuery("(max-width:442px)");
  const isLTE490 = useMediaQuery("(max-width:490px)");
  const isLTE918 = useMediaQuery("(max-width:918px)");

  const handleBoxClick = () => {
    navigate(`/detail/${product?.id}`);
    if (typeof handleProductClick === "function") {
      handleProductClick(product?.id);
    }
  };

  return (
    <Box
      sx={{
        margin: productAdmin ? "5px" : isLTE918 ? "0px" : "10px",
        marginY: isLTE426 ? "8px" : isLTE490 ? "8px" : "",
        width: enDetail
          ? "10rem"
          : isLTE321
          ? "13rem"
          : isLTE373
          ? "9.4rem"
          : isLTE490
          ? "11rem"
          : "12rem",
        height: productAdmin
          ? "15rem"
          : enDetail
          ? "15rem"
          : isLTE490
          ? "16.5rem"
          : "17rem",
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
      onClick={handleBoxClick}
    >
      <Box p={2} sx={{}}>
        <Box
          width={1}
          height={isLTE321 ? "9rem" : "8rem"}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box component="img" src={product?.image1} alt={product?.title} />
        </Box>
        <Box mt={1}>
          <Typography
            title={product?.title}
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: "30px",
              fontSize: enDetail ? "15.5px" : isLTE490 ? "17.5px" : "19px",
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
            <ProductPrice price={product?.price} style={priceStyle} />
          </Typography>
        </Box>

        {!enDetail && (
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
        )}
      </Box>
    </Box>
  );
};

export default ProductItem;
