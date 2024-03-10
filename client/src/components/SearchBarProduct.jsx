/* eslint-disable react-hooks/exhaustive-deps */
import { Box, TextField, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
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
  };

  useEffect(() => {
    if (searchTermProducts.string.length > 0) {
      let page = 1;
      dispatch(getTermProducts(searchTermProducts.string, page));
    } else {
      dispatch(clearProductosFiltrados());
      dispatch(getProducts());
    }
  }, [searchTermProducts.string]);

  return (
    <Box sx={{}}>
      <TextField
        id="search"
        label="Buscar producto"
        variant="outlined"
        onChange={handlerSearchTermProducts}
        InputProps={{
          endAdornment: <SearchIcon />,
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
