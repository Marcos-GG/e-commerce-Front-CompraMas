/* eslint-disable react-hooks/exhaustive-deps */
import { Box, TextField, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  clearProductosFiltrados,
  getProducts,
  getTermProducts,
} from "../Redux/actions/productsActions";
import { useLocation } from "react-router-dom";

const SearchBarProduct = () => {
  const isLTE500 = useMediaQuery(`(max-width: 500px)`);
  const isLTE767 = useMediaQuery(`(max-width: 767px)`);

  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;

  const [searchTermProducts, setSearchTermProducts] = useState({
    string: "",
  });

  const handlerSearchTermProducts = (event) => {
    setSearchTermProducts({ string: event.target.value });
    if (event.target.value.trim() === "") {
      dispatch(getProducts(1));
      dispatch(clearProductosFiltrados());
    }
  };

  return (
    <Box sx={{}}>
      <TextField
        id="search"
        label="Buscar producto"
        variant="outlined"
        onChange={handlerSearchTermProducts}
        InputProps={{
          endAdornment: (
            <SearchIcon
              sx={{ cursor: "pointer" }}
              onClick={() => {
                dispatch(getTermProducts(searchTermProducts.string, 1));
              }}
            />
          ),
          sx: {
            fontSize: "14px",
            width:
              currentPath === "/"
                ? isLTE500
                  ? "12rem"
                  : "14rem"
                : isLTE767
                ? "14rem"
                : "15rem",
            height: "3rem",
            // mr: "15px",
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
