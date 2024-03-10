import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Redux/actions/productsActions";

const Paginado = () => {
  const dispatch = useDispatch();
  const cantidadProducts = useSelector(
    (state) => state.products.lengthProducts
  );
  console.log(cantidadProducts, "cantidad");

  const productosFiltrados = useSelector(
    (state) => state.products.productsFiltered
  );
  console.log(productosFiltrados.length, "productosFiltrados");

  const handlePageChange = (page) => {
    dispatch(getProducts(page));
  };

  const paginationButtons = () => {
    const buttons = [];
    const totalPages = Math.ceil(cantidadProducts / 3);

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <Button key={i} onClick={() => handlePageChange(i)}>
          {i}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <Box>
      Paginado
      <Box>{paginationButtons()}</Box>
    </Box>
  );
};

export default Paginado;
