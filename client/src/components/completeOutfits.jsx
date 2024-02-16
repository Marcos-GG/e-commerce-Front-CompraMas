/* eslint-disable react/prop-types */
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

const CompleteOutfits = ({ IdProduct, gender, category, products }) => {
  const isLTE1520 = useMediaQuery("(max-width:1520px)");

  const [productsOutfits, setProductsOutfits] = useState([]); // Inicializa productsOutfits

  useEffect(() => {
    const obtenerProductosCoincidentes = () => {
      const coincidentProducts = [];
      const includedCategories = [];

      for (const product of products) {
        if (
          product.category !== category &&
          product.gender === gender &&
          !includedCategories.includes(product.category)
        ) {
          coincidentProducts.push(product);
          includedCategories.push(product.category);

          if (coincidentProducts.length === 4) {
            break;
          }
        }
      }

      return coincidentProducts;
    };

    const productosParaOutfits = obtenerProductosCoincidentes();
    setProductsOutfits(productosParaOutfits);
  }, [IdProduct, gender, category, products]); // Dependencias del useEffect

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mt: "50px", mb: "20px" }}
      >
        COMPLETA TU OUTFIT
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: "90%",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {productsOutfits &&
          productsOutfits.map((product) => (
            <Box
              key={product.id}
              sx={{
                display: "flex",
                width: isLTE1520 ? "45%" : "49%",
                height: "auto",
                padding: isLTE1520 ? "7px" : "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={product.image}
                alt={product.title}
                sx={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default CompleteOutfits;
