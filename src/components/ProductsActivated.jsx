import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ProductsAdmin from "./ProductsAdmin";
import { useEffect } from "react";
import { getProductsAll } from "../Redux/actions/productsActions";

const ProductsActivated = () => {
  const dispatch = useDispatch();

  const products = useSelector(
    (state) => state.products.activatedProductsAdmin
  );
  const productosFiltrados = useSelector(
    (state) => state.products.productsFiltered
  );

  useEffect(() => {
    dispatch(getProductsAll());
  }, [dispatch]);

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
