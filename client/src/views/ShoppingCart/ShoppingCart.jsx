/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  addProduct,
  removeProduct,
} from "../../Redux/actions/ShoppingCartAction";
import ProductPrice from "../../components/ProductPrice";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.shoppingCart.products);

  const handleClickAdd = (product) => {
    dispatch(addProduct(product));
  };

  const handleClickRemove = (product) => {
    dispatch(removeProduct(product));
  };

  const calcularValorTotal = (subTotalGeneralStyle) => {
    const preciosTotales = products?.reduce(
      (total, products) => total + products.price * products.cantidad,
      0
    );

    const totalStyle = {
      fontSize: "30px",
    };

    const precioTotal = (
      <ProductPrice
        price={preciosTotales}
        style={subTotalGeneralStyle ? subTotalGeneralStyle : totalStyle}
      />
    );
    return precioTotal;
  };

  const subTotalGeneralStyle = {
    fontSize: "18px",
  };

  const calcularSubTotal = (index) => {
    let subTotales = [];

    products?.forEach((product) => {
      const subTotal = product.price * product.cantidad;
      subTotales.push(subTotal);
    });

    const subTotalStyle = {
      fontSize: "14px",
      fontWeight: "bold",
    };
    const precioSubTotal = (
      <ProductPrice price={subTotales[index]} style={subTotalStyle} />
    );

    return precioSubTotal;
  };

  useEffect(() => {
    if (products.length === 0) {
      navigate("/");
    }
  }, [products]);

  return (
    <Box sx={{ mt: "30px" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "55%", mr: "15px", bgcolor: "#F5F5F5", p: "8px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              my: "10px",
            }}
          >
            <Typography sx={{ width: "41%", ml: "40px", fontWeight: "bold" }}>
              Producto
            </Typography>
            <Typography sx={{ ml: "30px", fontWeight: "bold" }}>
              Precio
            </Typography>
            <Typography sx={{ ml: "30px", fontWeight: "bold" }}>
              Cantidad
            </Typography>
            <Typography sx={{ mr: "18px", fontWeight: "bold" }}>
              SubTotal
            </Typography>
          </Box>
          <Divider />
          {products &&
            products.map((product, index) => (
              <Box key={product.id}>
                <Box
                  sx={{
                    display: "flex",
                    m: "8px 0 12px 12px",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={product?.image1}
                    sx={{ width: "6.5rem" }}
                  />

                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      // bgcolor: "beige",
                      // flexDirection: "column",
                      justifyContent: "space-between",
                      mr: "20px",
                    }}
                  >
                    <Box sx={{ width: "40%" }}>
                      <Typography
                        variant="h6"
                        sx={{ fontSize: "15px", ml: "12px" }}
                      >
                        {product.title}
                      </Typography>
                    </Box>
                    <Box sx={{ ml: "24px" }}>
                      <ProductPrice price={product?.price} />
                    </Box>

                    {/* <Box
                      sx={{
                        display: "flex",
                        // justifyContent: "space-between",
                        mb: "15px",
                      }}
                    > */}
                    <Box
                      sx={{
                        bgcolor: "white",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        width: "6rem",
                        height: "25px",
                        ml: "1rem",
                        justifyContent: "center",
                      }}
                    >
                      <IconButton onClick={() => handleClickRemove(product)}>
                        <RemoveIcon sx={{ fontSize: "15px" }} />
                      </IconButton>

                      <Typography sx={{ fontSize: "15px" }}>
                        {product.cantidad}
                      </Typography>

                      <IconButton onClick={() => handleClickAdd(product)}>
                        <AddIcon sx={{ fontSize: "15px" }} />
                      </IconButton>
                    </Box>
                    {/* <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "55%",
                        }}
                      > */}

                    {calcularSubTotal(index)}
                    {/* </Box> */}
                    {/* </Box> */}
                  </Box>
                </Box>
                <Divider sx={{ width: "95%", height: "1px", m: "auto" }} />
              </Box>
            ))}
        </Box>

        <Box
          sx={{
            width: "25%",
            display: "flex",
            height: "20rem",
            position: "sticky",
            top: "10px",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ bgcolor: "#F5F5F5", width: "100%", display: "flex" }}>
            <Typography sx={{ m: "auto", my: "10px", fontWeight: "bold" }}>
              RESUMEN DE COMPRA
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: "#F5F5F5",
              width: "100%",
              height: "12rem",
              mt: "5px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                mx: "20px",
                mt: "15px",
                gap: "13px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography>SubTotal general:</Typography>
                {calcularValorTotal(subTotalGeneralStyle)}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography>Descuentos:</Typography>
                {"$ 0"}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mx: "30px",
                mt: "15px",
              }}
            >
              <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                Total:{" "}
              </Typography>
              {calcularValorTotal()}
            </Box>
          </Box>

          <Divider sx={{ width: "90%", height: "1px" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "#F5F5F5",
              width: "100%",
            }}
          >
            <Box>
              <Button
                variant="contained"
                sx={{ width: "18rem", borderRadius: "30px", mt: "10px" }}
              >
                Iniciar pago
              </Button>
            </Box>

            <Button
              component={NavLink}
              to="/"
              sx={{ color: "inherit", textDecoration: "none", mt: "3px" }}
            >
              <Typography
                sx={{
                  fontSize: "12.5px",
                  textDecoration: "none",
                  textDecorationStyle: "none",
                }}
              >
                seguir comprando
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ShoppingCart;
