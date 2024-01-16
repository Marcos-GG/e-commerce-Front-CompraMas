/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import Card from "./Card";

function CardContainer({ products }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {products &&
          products.map((product) => (
            <Box key={product?.id}>
              <Card product={product} />
            </Box>
          ))}
      </Box>
    </Box>
  );
}

export default CardContainer;
