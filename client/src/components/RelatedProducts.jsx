/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProductId } from "../Redux/actions/productsActions";
import {
  Box,
  Typography,
  keyframes,
  styled,
  useMediaQuery,
} from "@mui/material";
import ProductItem from "./ProductItem";

function RelatedProducts({ productAdmin }) {
  const isLTE426 = useMediaQuery("(max-width:426px)");
  const isLTE800 = useMediaQuery("(max-width:800px)");
  const isLTE1250 = useMediaQuery("(max-width:1250px)");

  const productosRelacionados = useSelector(
    (state) => state.products.relacionados
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  100% { transform: translateX(calc(-10.6rem * ${productosRelacionados.length} ));
}
`;

  const slideAnimationSmallScreen = keyframes`
  0% { transform: translateX(0); }
  100% { 
    transform: translateX(calc(-9rem * ${productosRelacionados.length} ));
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
      {productosRelacionados && productosRelacionados?.length === 5 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: productAdmin || isLTE1250 ? "center" : "start",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              m: productAdmin ? "10px 0 5px 0" : "20px 0 10px 0",
              alignSelf: "center",
            }}
          >
            Productos relacionados:
          </Typography>

          <Box sx={{ position: "relative", width: "85%" }}>
            <AnimatedBox
              sx={{ width: "100%", height: productAdmin && "16.5rem" }}
            >
              {productosRelacionados?.length > 0 &&
                productosRelacionados.map((product) => (
                  <Box
                    key={product.id}
                    sx={{ width: "100%", mx: product ? "0" : "3px" }}
                  >
                    <ProductItem
                      productAdmin={productAdmin}
                      product={product}
                      navigate={navigate}
                      priceStyle={priceStyle}
                      handleProductClick={handleProductClick}
                    />
                  </Box>
                ))}
              {productosRelacionados?.length > 0 &&
                productosRelacionados.map((product) => (
                  <Box
                    key={product.id}
                    sx={{ width: "100%", mx: product ? "0" : "3px" }}
                  >
                    <ProductItem
                      productAdmin={productAdmin}
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
