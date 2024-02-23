import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import {
  getProducts,
  putProduct,
  moveToDeactivate,
} from "../Redux/actions/productsActions";
import SearchBarProduct from "./SearchBarProduct";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import ProductPrice from "./ProductPrice";
import EditNoteIcon from "@mui/icons-material/EditNote";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ProductsAdmin = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  console.log(products, "products");
  const productosFiltrados = useSelector(
    (state) => state.products.productsFiltered
  );
  console.log(productosFiltrados, "productosFiltrados");

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const deactiveProduct = (id, product) => {
    const updateProduct = { ...product, status: false };
    dispatch(putProduct(id, updateProduct));
    dispatch(moveToDeactivate(id));
  };

  const renderProductsMap = (products) => {
    return products.map((product) => (
      <Box
        key={product.id}
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          m: "8px 10px 4px 10px",
          border: "1px solid",
          borderRadius: "5px",
        }}
      >
        <Box
          component="img"
          src={product?.image1}
          sx={{ width: "9rem", maxWidth: "9rem", objectFit: "contain" }}
        />
        <Box
          sx={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <Box sx={{ m: "5px" }}>
            <Typography variant="h6" sx={{}}>
              {product.title}
            </Typography>
            <Box sx={{ m: "2px 0 0 10px" }}>
              <ProductPrice price={product?.price} />
            </Box>
          </Box>

          <Box
            sx={{
              height: "30%",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Tooltip title="editar" arrow placement="top">
              <IconButton sx={{ width: "40px", height: "40px" }}>
                <EditNoteIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="ver más" arrow placement="top">
              <NavLink to={`/detail/${product.id}`}>
                <IconButton sx={{ width: "40px", height: "40px" }}>
                  <VisibilityIcon />
                </IconButton>
              </NavLink>
            </Tooltip>

            <Tooltip title="suspender" arrow placement="top">
              <IconButton
                onClick={() => deactiveProduct(product.id, product)}
                sx={{ width: "40px", height: "40px" }}
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="eliminar" arrow placement="top">
              <IconButton sx={{ width: "40px", height: "40px" }}>
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    ));
  };

  return (
    <Box sx={{ bgcolor: "beige", width: "100%" }}>
      <h1>aca se ven los productos y se los desactiva</h1>
      <Box sx={{ m: "0 0 20px 10px" }}>
        <SearchBarProduct />
      </Box>
      <Box sx={{ display: "flex" }}>
        {productosFiltrados && productosFiltrados.length > 0 ? (
          <Box
            sx={{
              bgcolor: "#F5F5F5",
              width: "58%",
              overflow: "auto",
              maxHeight: "45rem",
            }}
          >
            {renderProductsMap(productosFiltrados)}
          </Box>
        ) : (
          <Box
            sx={{
              bgcolor: "#F5F5F5",
              width: "58%",
              overflow: "auto",
              maxHeight: "45rem",
            }}
          >
            {renderProductsMap(products)}
          </Box>
        )}

        <Box sx={{ width: "40%" }}>mostramos la informacion del producto</Box>
      </Box>
    </Box>
  );
};

export default ProductsAdmin;
