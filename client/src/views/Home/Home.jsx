/* eslint-disable react-hooks/exhaustive-deps */
import Style from "./Home.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getProducts } from "../../Redux/actions/productsActions";
import CardContainer from "../../components/CardContainer";
import Filtros from "../../components/Filtros";
import { Box, useMediaQuery /* useTheme */ } from "@mui/material";
import { GET_PRODUCTS } from "../../Redux/actionsTypes/ProductsActionTypes";
import SearchBarProduct from "../../components/SearchBarProduct";

function Home() {
  // const theme = useTheme();
  const isLTE1000 = useMediaQuery("(max-width:1000px)");
  const isLTE1700 = useMediaQuery("(max-width:1700px)");
  const isLTE1025 = useMediaQuery("(max-width:1025px)");

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  console.log(products, "products");

  const productosFiltrados = useSelector(
    (state) => state.products.productsFiltered
  );

  console.log(productosFiltrados, "home productosFiltrados");

  const [productsFiltered, setProductsFiltered] = useState([]);

  console.log(
    productsFiltered,
    "estado cargado con los productos para filtrar"
  );

  const [, setError] = useState(null);

  useEffect(() => {
    try {
      const persistedData = localStorage.getItem("persist:root");

      if (persistedData) {
        const parsedData = JSON.parse(persistedData);

        const localProducts =
          parsedData.products && JSON.parse(parsedData.products).products;

        if (localProducts || localProducts.length > 0) {
          dispatch({ type: GET_PRODUCTS, payload: localProducts });
        }
      }

      dispatch(getProducts());
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    setProductsFiltered(productosFiltrados);
  }, [productosFiltrados]);

  // vida del boton filtros
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <Box className={Style}>
      <h1>home</h1>

      <Box>
        <SearchBarProduct />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: isLTE1000 ? "column" : "",
        }}
      >
        {isLTE1000 ? (
          <Box
            sx={{
              bgcolor: "#f5f5f5",
              boxShadow: "0px 5px 15px #888888;",
              mb: "2rem",
              width: open ? "100vw" : "12rem",
              transition: "width 0.6s ease",
            }}
          >
            <Filtros open={open} handleDrawerToggle={handleDrawerToggle} />
          </Box>
        ) : (
          <Box
            sx={{
              background: "#f5f5f5",
              padding: "0 15px 0 15px",
              width: "19rem",
              borderRadius: "0 5px 5px 0",
              border: "1px solid #00CCFD",
              minWidth: "12rem",
              maxHeight: "37rem",
              minHeight: "37rem",
              marginRight: isLTE1025 ? "3.5rem" : isLTE1700 ? "3.5rem" : "",
            }}
          >
            <Filtros open={open} handleDrawerToggle={handleDrawerToggle} />
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "1",
            margin: "0 auto",
          }}
        >
          <CardContainer
            products={
              productsFiltered && productsFiltered.length === 0
                ? products
                : productosFiltrados
            }
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
