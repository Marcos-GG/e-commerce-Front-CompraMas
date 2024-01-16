/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getCategory, getGender } from "../Redux/actions/CategoryGender";
import { useDispatch, useSelector } from "react-redux";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Slider,
  TextField,
} from "@mui/material";

const Filtros = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getGender());
  }, []);

  const products = useSelector((state) => state.products.products);
  const genders = useSelector((state) => state.categoryGender.gender);
  const categorias = useSelector((state) => state.categoryGender.category);

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [generoSeleccionado, setGeneroSeleccionado] = useState(null);
  const [morePopular, setMorePopular] = useState(false);

  const [combinedFilters, setCombinedFilters] = useState({
    category: null,
    gender: null,
    morePopular: null,
    price: { min: 50, max: 500 },
  });

  //   const handlerSlider = (event) => {
  //     const { name, value } = event.target;

  //     setCombinedFilters({
  //       ...combinedFilters,
  //       [name]: value,
  //     });
  //   };

  const valorMinimo = 0;
  const valorMaximo = products.reduce((maxPrice, product) => {
    return Math.max(maxPrice, product.price);
  }, 0);

  const handlePriceChange = (event, newPrice) => {
    setCombinedFilters({
      ...combinedFilters,
      price: { min: newPrice[0], max: newPrice[1] },
    });
  };

  const handleChangeCheckbox = (event) => {
    setMorePopular(event.target.checked);
    setCombinedFilters((prevFiltros) => ({
      ...prevFiltros,
      morePopular: event.target.checked,
    }));
  };

  // const applyFilters = (combinedFilters) => {
  //   // Verifica si todos los valores son null

  //   if (allNull) {
  //   }
  //   dispatch();
  // };

  return (
    <Box>
      <h1>filtros</h1>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <Autocomplete
          value={generoSeleccionado}
          onChange={(event, newValue) => {
            setGeneroSeleccionado(newValue);
            setCombinedFilters((prevFiltros) => ({
              ...prevFiltros,
              gender: newValue ? newValue.nombre : null,
            }));
          }}
          getOptionLabel={(option) => option.gender}
          options={genders}
          renderInput={(params) => (
            <TextField {...params} placeholder="Generos" />
          )}
        />

        <Autocomplete
          value={categoriaSeleccionada}
          onChange={(event, newValue) => {
            setCategoriaSeleccionada(newValue);
            setCombinedFilters((prevFiltros) => ({
              ...prevFiltros,
              category: newValue ? newValue.nombre : null,
            }));
          }}
          getOptionLabel={(option) => option.name}
          options={categorias}
          renderInput={(params) => (
            <TextField {...params} placeholder="Categorias" />
          )}
        />
      </Box>

      <Checkbox
        checked={morePopular}
        onChange={handleChangeCheckbox}
        name="morePopular"
        inputProps={{ "aria-label": "controlled" }}
      />
      <label htmlFor="morePopular">Los más gustados</label>

      <Slider
        value={[combinedFilters.price.min, combinedFilters.price.max]}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={valorMinimo}
        max={valorMaximo} // Ajusta según tus necesidades
      />

      <p>Valor min: {combinedFilters.price.min}</p>
      <p>Valor max: {combinedFilters.price.max}</p>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          disabled={Object.keys(combinedFilters)
            .filter((key) => key !== "price")
            .every((key) => combinedFilters[key] === null)}
        >
          Aplicar filtros
        </Button>
      </Box>
    </Box>
  );
};

export default Filtros;
