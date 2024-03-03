// import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import ProductsAdmin from "./ProductsAdmin";

const DesactivatedProducts = () => {
  const products = useSelector((state) => state.products.desactivatedproducts);
  const productosFiltrados = useSelector(
    (state) => state.products.productsFilteredFalse
  );

  // useEffect(() => {
  //   if (products.length === 0) {
  //     dispatch(putProduct());
  //   }
  // }, [dispatch, products]);

  return (
    <Box>
      <ProductsAdmin
        products={products}
        productosFiltrados={productosFiltrados}
      />
    </Box>
  );
};

export default DesactivatedProducts;
