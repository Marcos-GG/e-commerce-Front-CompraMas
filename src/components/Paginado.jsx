import { Box, Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Redux/actions/productsActions";
import { useEffect, useState } from "react";

const Paginado = () => {
  const dispatch = useDispatch();
  const productosLength = useSelector(
    (state) => state.products?.lengthProducts
  );

  const productosFiltrados = useSelector(
    (state) => state.products?.productsFiltered
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
    dispatch(getProducts(page));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [productosFiltrados]);

  return (
    <Box sx={{ bgcolor: "#F5F5F5", my: "2rem" }}>
      <Pagination
        count={Math.ceil(
          (EstaFiltrando || EstaFiltrandoSearch
            ? productosFiltrados?.length
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
