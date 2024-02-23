/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductId } from "../Redux/actions/productsActions";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  keyframes,
  styled,
  useMediaQuery,
} from "@mui/material";
import ProductItem from "./ProductItem";

function RelatedProducts({ products, category, gender }) {
  const isLTE426 = useMediaQuery("(max-width:426px)");
  const isLTE800 = useMediaQuery("(max-width:800px)");
  const isLTE1250 = useMediaQuery("(max-width:1250px)");

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Filtrar directamente en el useEffect
    const newFilteredProducts = products
      .filter((product) => {
        return (
          product.id != id && // Excluir el producto actual
          product.category === category &&
          product.gender === gender
        );
      })
      .slice(0, 5);

    // Actualizar el estado
    setFilteredProducts(newFilteredProducts);
  }, [id, products, category, gender]);

  const handleProductClick = (productId) => {
    dispatch(getProductId(productId));
  };

  const priceStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    color: "black",
  };

  const slideAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-11.6rem * ${filteredProducts.length} ));
}
`;

  const slideAnimationSmallScreen = keyframes`
  0% { transform: translateX(0); }
  100% { 
    transform: translateX(calc(-10.5rem * ${filteredProducts.length} ));
  }
`;

  const AnimatedBox = styled(Box)({
    display: "flex",
    overflow: "hidden",
    position: "relative",
    "& > div": {
      whiteSpace: "nowrap",
      display: "flex",
      animation: `${slideAnimation} 30s linear infinite`, // Aquí he aumentado la duración para mantener el desplazamiento continuo
    },
    "@media (max-width: 800px)": {
      "& > div": {
        animation: `${slideAnimationSmallScreen} 30s linear infinite`, // Para pantallas de 800px o menos
      },
    },
  });

  return (
    <Box>
      {filteredProducts && filteredProducts?.length === 5 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: isLTE1250 ? "center" : "start",
          }}
        >
          <Typography
            variant="h5"
            sx={{ m: "20px 0 10px 0", alignSelf: "center" }}
          >
            Productos relacionados:
          </Typography>

          <Box sx={{ position: "relative", width: "90%" }}>
            <AnimatedBox sx={{ width: "100%" }}>
              {filteredProducts?.length > 0 &&
                filteredProducts.map((product) => (
                  <Box key={product.id} sx={{ width: "100%", mx: "3px" }}>
                    <ProductItem
                      product={product}
                      navigate={navigate}
                      priceStyle={priceStyle}
                      handleProductClick={handleProductClick}
                    />
                  </Box>
                ))}
              {filteredProducts?.length > 0 &&
                filteredProducts.map((product) => (
                  <Box key={product.id} sx={{ width: "100%", mx: "3px" }}>
                    <ProductItem
                      product={product}
                      navigate={navigate}
                      priceStyle={priceStyle}
                      handleProductClick={handleProductClick}
                    />
                  </Box>
                ))}
            </AnimatedBox>

            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: -1, // Ajusta según tus necesidades
                height: "100%",
                width: isLTE426 ? 40 : isLTE800 ? 100 : 200, // Ancho del efecto de desvanecimiento
                background:
                  "linear-gradient(to left, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: -2, // Ajusta según tus necesidades
                height: "100%",
                width: isLTE426 ? 40 : isLTE800 ? 100 : 200, // Ancho del efecto de desvanecimiento
                background:
                  "linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
              }}
            />
          </Box>
          {/* Pseudo-elementos para el efecto de desvanecimiento */}
        </Box>
      )}
    </Box>
  );
}

export default RelatedProducts;
