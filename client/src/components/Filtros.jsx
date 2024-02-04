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
  Typography,
} from "@mui/material";
import {
  apllyFilters,
  clearProductosFiltrados,
} from "../Redux/actions/productsActions";

const Filtros = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);

  const genders = useSelector((state) => state.categoryGender.gender);
  const categorias = useSelector((state) => state.categoryGender.category);

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [generoSeleccionado, setGeneroSeleccionado] = useState(null);
  const [morePopular, setMorePopular] = useState(false);
  const [estadoBoton, setEstadoBoton] = useState(false);
  const [initialPrice, setInitialPrice] = useState({ min: 0, max: 0 }); // Valores iniciales del precio

  const [combinedFilters, setCombinedFilters] = useState({
    category: null,
    gender: null,
    morePopular: null,
    price: { min: initialPrice.min, max: initialPrice.max },
  });

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getGender());
  }, []);

  useEffect(() => {
    const maxPrice = Math.max(...products.map((product) => product.price));
    setInitialPrice({ min: 0, max: maxPrice });
    setCombinedFilters((prevFilters) => ({
      ...prevFilters,
      price: { min: 0, max: maxPrice },
    }));
  }, [products]);

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

  const limpiarFiltros = () => {
    setCombinedFilters({
      category: null,
      gender: null,
      morePopular: null,
      price: { ...initialPrice },
    });
    // restablecemos manualmente porque los valores que fueron seleccionados quedaban guardados visualmente
    setCategoriaSeleccionada(null);
    setGeneroSeleccionado(null);
    setMorePopular(false);

    dispatch(clearProductosFiltrados());
  };

  useEffect(() => {
    const { category, gender, morePopular, price } = combinedFilters;
    const filtersNull = category === null && gender === null && !morePopular;
    const priceChanged =
      price.min !== initialPrice.min || price.max !== initialPrice.max;

    setEstadoBoton(!(!filtersNull || priceChanged));
  }, [combinedFilters, initialPrice]);

  const handleApplyFilter = () => {
    dispatch(apllyFilters(combinedFilters));
  };

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
              gender: newValue ? newValue.gender : null,
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
              category: newValue ? newValue.name : null,
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
        min={initialPrice.min}
        max={initialPrice.max}
      />

      <Typography variant="subtitle2">
        Valor min: {combinedFilters.price.min}
      </Typography>
      <Typography variant="subtitle2">
        Valor max: {combinedFilters.price.max}
      </Typography>

      <Box
        sx={{ display: "flex", justifyContent: "center" }}
        onClick={handleApplyFilter}
      >
        <Button variant="contained" disabled={estadoBoton}>
          Aplicar filtros
        </Button>
      </Box>

      <Box
        sx={{
          cursor: "pointer", // Añadí esto para que el cursor indique que es un elemento clickeable
          "&:hover": {
            color: "primary.main", // Cambia el color al pasar el mouse sobre el texto
          },

          textAlign: "center",
        }}
        onClick={() => limpiarFiltros()}
      >
        <Typography variant="subtitle2">Limpiar Filtros</Typography>
      </Box>
    </Box>
  );
};

export default Filtros;
