/* eslint-disable react-hooks/exhaustive-deps */
import { Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  clearProductosFiltrados,
  getProducts,
  getTermProducts,
} from "../Redux/actions/productsActions";

const SearchBarProduct = () => {
  const dispatch = useDispatch();

  const [searchTermProducts, setSearchTermProducts] = useState({
    string: "",
  });

  const handlerSearchTermProducts = (event) => {
    setSearchTermProducts({ string: event.target.value });
  };

  useEffect(() => {
    if (searchTermProducts.string.length > 0) {
      dispatch(getTermProducts(searchTermProducts.string));
    } else {
      dispatch(clearProductosFiltrados());
      dispatch(getProducts());
    }
  }, [searchTermProducts.string]);

  return (
    <Box sx={{ bgcolor: "beige" }}>
      <TextField
        id="search"
        label="Buscar producto"
        variant="outlined"
        onChange={handlerSearchTermProducts}
        InputProps={{
          endAdornment: <SearchIcon />,
          sx: {
            fontSize: "14px",
            width: "15rem",
            height: "3rem",
            mr: "15px",
          },
        }}
        sx={{
          "& label": {
            fontSize: "15px",
            color: "gray",
          },
        }}
      />
    </Box>
  );
};

export default SearchBarProduct;
