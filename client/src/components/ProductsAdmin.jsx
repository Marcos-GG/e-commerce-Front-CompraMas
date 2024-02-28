import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getProducts,
  putProduct,
  moveToDeactivate,
} from "../Redux/actions/productsActions";
import SearchBarProduct from "./SearchBarProduct";
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ProductPrice from "./ProductPrice";
import EditNoteIcon from "@mui/icons-material/EditNote";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DetailProduct from "../views/DetailProduct/DetailProduct";

const ProductsAdmin = () => {
  const isLTE600 = useMediaQuery("(max-width:600px)");
  const isLTE1023 = useMediaQuery("(max-width:1023px)");
  const isLTE1300 = useMediaQuery("(max-width:1300px)");
  const dispatch = useDispatch();

  const [productDetail, setProductDetail] = useState(null);

  const products = useSelector((state) => state.products.products);
  const productosFiltrados = useSelector(
    (state) => state.products.productsFiltered
  );

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

  const handlerVerDetail = (product) => {
    setProductDetail(product);
  };

  const renderProductsMap = (products) => {
    return products.map((product) => (
      <Box
        key={product.id}
        sx={{
          display: "flex",
          justifyContent: isLTE1023 ? "start" : "space-evenly",
          m: isLTE1023 ? "5px 10px 4px 10px" : "8px 10px 4px 10px",
          border: "1px solid",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => handlerVerDetail(product)}
      >
        <Box
          component="img"
          src={product?.image1}
          sx={{
            width: isLTE1023 ? "6rem" : isLTE1300 ? "8rem" : "9rem",
            maxWidth: isLTE1023 ? "6rem" : isLTE1300 ? "8rem" : "9rem",
            borderRadius: "10px 0 0 10px",
            objectFit: "contain",
          }}
        />
        <Box
          sx={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            overflow: "hidden",
          }}
        >
          <Box sx={{ m: "5px" }}>
            <Typography
              variant="h6"
              sx={{
                fontSize: isLTE600 ? "14.5px" : isLTE1300 && "16px",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {product.title}
            </Typography>
            <Box sx={{ m: "2px 0 0 10px" }}>
              <ProductPrice price={product?.price} />
            </Box>
          </Box>

          <Box
            sx={{
              bgcolor: "#E3E6E7",
              height: isLTE1023 ? "50%" : "30%",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Tooltip title="editar" arrow placement="top">
              <IconButton
                sx={{ width: "40px", height: "40px" }}
                onClick={(e) => e.stopPropagation()}
              >
                <EditNoteIcon sx={{ fontSize: isLTE1300 && "20px" }} />
              </IconButton>
            </Tooltip>

            <Tooltip title="ver más" arrow placement="top">
              <NavLink to={`/detail/${product.id}`}>
                <IconButton
                  sx={{ width: "40px", height: "40px" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <VisibilityIcon sx={{ fontSize: isLTE1300 && "20px" }} />
                </IconButton>
              </NavLink>
            </Tooltip>

            <Tooltip title="suspender" arrow placement="top">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  deactiveProduct(product.id, product);
                }}
                sx={{ width: "40px", height: "40px" }}
              >
                <RemoveCircleOutlineIcon
                  sx={{ fontSize: isLTE1300 && "20px" }}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="eliminar" arrow placement="top">
              <IconButton
                sx={{ width: "40px", height: "40px" }}
                onClick={(e) => e.stopPropagation()}
              >
                <DeleteForeverIcon sx={{ fontSize: isLTE1300 && "20px" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    ));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <h1>aca se ven los productos y se los desactiva</h1>
      <Box sx={{ m: "0 0 20px 10px" }}>
        <SearchBarProduct />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: isLTE1023 && "column",
          justifyContent: "space-between",
        }}
      >
        {productosFiltrados && productosFiltrados.length > 0 ? (
          <Box
            sx={{
              bgcolor: "#F5F5F5",
              width: isLTE1023 ? "100%" : "43%",
              overflow: "auto",
              maxHeight: "44rem",
            }}
          >
            {renderProductsMap(productosFiltrados)}
          </Box>
        ) : (
          <Box
            sx={{
              bgcolor: "#F5F5F5",
              width: isLTE1023 ? "100%" : "43%",
              overflow: "auto",
              maxHeight: "44rem",
            }}
          >
            {renderProductsMap(products)}
          </Box>
        )}

        <Box
          sx={{
            mt: isLTE1023 && "6px",
            width: isLTE1023 ? "100%" : "57%",
            bgcolor: "#F5F5F5",
            ml: isLTE1023 ? 0 : "5px",
          }}
        >
          {productDetail ? (
            <Box>
              <DetailProduct product={productDetail} />
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "44rem",
                backgroundColor: "#F5F5F5",
                boxShadow: "10px 10px 15px #888888",
                backgroundImage: 'url("/logoblanco.svg")',
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductsAdmin;
