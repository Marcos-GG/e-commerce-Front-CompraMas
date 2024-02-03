/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const ProductItem = ({
  product,
  handleClickAdd,
  handleClickLike,
  liked,
  navigate,
}) => {
  return (
    <Box
      sx={{
        margin: "10px",
        width: "12rem",
        height: "17rem",
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
          <Box component="img" src={product.image} alt={product?.title} />
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
              fontSize: "19px",
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
};

export default ProductItem;
