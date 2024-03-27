import { Box, Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { apllyFilters, getProducts } from "../Redux/actions/productsActions";
import { useEffect, useState } from "react";

const Paginado = () => {
  const dispatch = useDispatch();
  const productosLength = useSelector(
    (state) => state.products?.lengthProducts
  );

  // const productosFiltrados = useSelector(
  //   (state) => state.products?.productsFiltered
  // );

  const filtrosAplicados = useSelector((state) => state.products?.filtros);

  const paginadoFiltrados = useSelector(
    (state) => state.products?.lengthProductsFiltered
  );

  const EstaFiltrandoSearch = useSelector(
    (state) => state.products?.isSearchFilterUsed
  );

  const EstaFiltrando = useSelector(
    (state) => state.products?.isApplyFilterUsed
  );

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (EstaFiltrandoSearch || EstaFiltrando) {
      dispatch(apllyFilters(filtrosAplicados, page));
    } else {
      dispatch(getProducts(page));
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [paginadoFiltrados]);

  return (
    <Box sx={{ bgcolor: "#F5F5F5", my: "2rem" }}>
      <Pagination
        count={Math.ceil(
          (EstaFiltrando || EstaFiltrandoSearch
            ? paginadoFiltrados
            : productosLength) / 21
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
