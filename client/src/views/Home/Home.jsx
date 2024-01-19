/* eslint-disable react-hooks/exhaustive-deps */
import Style from "./Home.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getProducts } from "../../Redux/actions/productsActions";
import CardContainer from "../../components/CardContainer";
import Filtros from "../../components/Filtros";
import { Box } from "@mui/material";
import { allComments } from "../../Redux/actions/CommentsAction";
import { ALL_COMMENTS } from "../../Redux/actionsTypes/CommentsTypes";
import { GET_PRODUCTS } from "../../Redux/actionsTypes/ProductsActionTypes";

function Home() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);

  const productosFiltrados = useSelector(
    (state) => state.products.productsFiltered
  );

  const [productsFiltered, setProductsFiltered] = useState([]);

  useEffect(() => {
    const persistedData = localStorage.getItem("persist:root");

    if (persistedData) {
      const parsedData = JSON.parse(persistedData);

      const localProducts =
        parsedData.products && JSON.parse(parsedData.products).products;

      console.log(localProducts, "local products");

      if (localProducts || localProducts.length > 0) {
        dispatch({ type: GET_PRODUCTS, payload: localProducts });
      } else {
        dispatch(getProducts());
      }

      const localComments =
        parsedData.comments && JSON.parse(parsedData.comments).comments;

      console.log(localComments, "local comments");

      if (localComments || localComments.length > 0) {
        dispatch({ type: ALL_COMMENTS, payload: localComments });
      } else {
        dispatch(allComments());
      }
    } else {
      dispatch(getProducts());
      dispatch(allComments());
    }
  }, []);

  useEffect(() => {
    setProductsFiltered(productosFiltrados);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productosFiltrados]);

  return (
    <Box className={Style}>
      <h1>home</h1>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            backgroundColor: "aquamarine",
            padding: "0 15px 0 15px",
            width: "19rem",
            minWidth: "12rem",
          }}
        >
          <Filtros />
        </Box>
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
              productsFiltered && productsFiltered.length > 0
                ? productosFiltrados
                : products
            }
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
