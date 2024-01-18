import Style from "./Home.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getProducts } from "../../Redux/actions/productsActions";
import CardContainer from "../../components/CardContainer";
import Filtros from "../../components/Filtros";
import { Box } from "@mui/material";
// import { persistor } from "../../Redux/store";

function Home() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  console.log(products);
  const productosFiltrados = useSelector(
    (state) => state.products.productsFiltered
  );

  const [productsFiltered, setProductsFiltered] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setProductsFiltered(productosFiltrados);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productosFiltrados]);

  // useEffect(() => {
  //   const handlePersistingData = async () => {
  //     try {
  //       const purgeResult = await persistor.purge();
  //       ("Resultado de purgar datos persistidos:", purgeResult);
  //       cnull,persistResult = await persistor.persist();
  //       ("Resultado de persistir datos:", persistResult);
  //       // Aquí puedes realizar cualquier otra lógica necesaria después de purgar y persistir los datos
  //     } catch (error) {
  //       console.error("Error al purgar o persistir datos:", error);
  //     }
  //   };

  //   handlePersistingData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
