import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import ProductsAdmin from "./ProductsAdmin";

const ProductsActivated = () => {
  const products = useSelector((state) => state.products.products);
  const productosFiltrados = useSelector(
    (state) => state.products.productsFiltered
  );

  return (
    <Box>
      <ProductsAdmin
        products={products}
        productosFiltrados={productosFiltrados}
      />
    </Box>
  );
};

export default ProductsActivated;
