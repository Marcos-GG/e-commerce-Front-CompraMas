import { Box, Typography } from "@mui/material";

/* eslint-disable react/prop-types */
const ProductPrice = ({ price, style }) => {
  const formattedPrice = (price) => {
    const formatted = parseFloat(price).toLocaleString("es-ES", {
      maximumFractionDigits: 0,
    });
    return formatted;
  };

  return (
    <Box>
      <Typography style={style}>${formattedPrice(price)}</Typography>
    </Box>
  );
};

export default ProductPrice;
