import { Box, Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Redux/actions/productsActions";
import { useEffect, useState } from "react";

const Paginado = () => {
  const dispatch = useDispatch();
  const productosLength = useSelector(
    (state) => state.products?.lengthProducts
  );

  console.log(productosLength);

  const productosFiltrados = useSelector(
    (state) => state.products?.productsFiltered
  );

  const EstaFiltrandoSearch = useSelector(
    (state) => state.products?.isSearchFilterUsed
  );

  const EstaFiltrando = useSelector(
    (state) => state.products?.isApplyFilterUsed
  );

  console.log(productosFiltrados, "productosFiltrados");
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    dispatch(getProducts(page));
  };

  /// cuaando  se limpia la busqueda por search se realiza un get de products por eso siempre  volvemos a mostar el valor 1 en pagination

  useEffect(() => {
    // Resetear la página cuando cambie la lista de productos
    setCurrentPage(1);
  }, [productosFiltrados]);

  return (
    <Box sx={{ bgcolor: "#F5F5F5", my: "2rem" }}>
      <Pagination
        count={Math.ceil(
          (EstaFiltrando || EstaFiltrandoSearch
            ? productosFiltrados?.length
            : productosLength) / 20
        )}
        page={currentPage}
        onChange={(e, page) => {
          handlePageChange(page);
        }}
      />
    </Box>
  );
};

export default Paginado;
