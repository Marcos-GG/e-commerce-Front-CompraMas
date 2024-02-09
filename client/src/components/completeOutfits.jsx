/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const CompleteOutfits = ({ IdProduct, gender, category, products }) => {
  console.log("idProduct ", IdProduct);
  console.log("gender", gender);
  console.log("category", category);
  console.log("products", products);

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
    <Box>
      {productsOutfits &&
        productsOutfits.map((product) => (
          <Box key={product.id}>
            <img src={product.image} alt={product.title} />
          </Box>
        ))}
    </Box>
  );
};

export default CompleteOutfits;
