/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  addProduct,
  finalizarCompra,
  removeProduct,
} from "../../Redux/actions/ShoppingCartAction";
import ProductPrice from "../../components/ProductPrice";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLTE424 = useMediaQuery(`(max-width: 424px)`);
  const isLTE650 = useMediaQuery(`(max-width: 650px)`);
  const isLTE700 = useMediaQuery(`(max-width: 700px)`);
  const isLTE900 = useMediaQuery(`(max-width: 900px)`);
  const isLTE999 = useMediaQuery(`(max-width: 999px)`);
  const isLTE1200 = useMediaQuery(`(max-width: 1200px)`);
  const isLTE1340 = useMediaQuery(`(max-width: 1340px)`);
  const isLTE1440 = useMediaQuery(`(max-width: 1440px)`);

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
      fontSize: isLTE700 ? "20px" : isLTE1440 ? "22px" : "30px",
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
    fontSize: isLTE1440 ? "16px" : "18px",
  };

  const priceIndividualStyle = {
    fontSize: isLTE1440 ? "14px" : "18px",
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

  const handleCompra = () => {
    dispatch(finalizarCompra());
  };

  return (
    <Box sx={{ mt: isLTE1200 ? "18px" : "30px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: isLTE650 ? "" : "center",
          flexDirection: isLTE900 && "column",
          alignItems: isLTE900 && "center",
        }}
      >
        <Box
          sx={{
            width: isLTE700
              ? "99%"
              : isLTE900
              ? "95%"
              : isLTE999
              ? "63%"
              : isLTE1440
              ? "60%"
              : "55%",
            mr: isLTE900 ? 0 : isLTE999 ? "10px" : "15px",
            bgcolor: "#F5F5F5",
            p: "8px",
            mb: isLTE900 && "10px",
          }}
        >
          {!isLTE650 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                my: isLTE700 ? "8px" : "10px",
              }}
            >
              <Typography
                sx={{
                  width: "41%",
                  ml: isLTE1200 ? "35px" : "40px",
                  fontWeight: "bold",
                  fontSize: isLTE700 ? "14px" : isLTE1200 && "15px",
                }}
              >
                Producto
              </Typography>
              <Typography
                sx={{
                  ml: "30px",
                  fontWeight: "bold",
                  fontSize: isLTE700 ? "14px" : isLTE1200 && "15px",
                }}
              >
                Precio
              </Typography>
              <Typography
                sx={{
                  ml: "30px",
                  fontWeight: "bold",
                  fontSize: isLTE700 ? "14px" : isLTE1200 && "15px",
                }}
              >
                Cantidad
              </Typography>
              <Typography
                sx={{
                  mr: "18px",
                  fontWeight: "bold",
                  fontSize: isLTE700 ? "14px" : isLTE1200 && "15px",
                }}
              >
                SubTotal
              </Typography>
            </Box>
          )}
          <Divider />
          {products &&
            products.map((product, index) => (
              <Box key={product.id}>
                <Box
                  sx={{
                    display: "flex",
                    m: isLTE700 ? "7px 0 10px 10px" : "8px 0 12px 12px",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={product?.image1}
                    sx={{
                      width: isLTE1200 ? "5.6rem" : "6.5rem",
                    }}
                  />

                  {isLTE650 && (
                    <Box sx={{ width: "100%" }}>
                      <Box
                        sx={{
                          width: "100%",
                          height: "3.6rem",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: isLTE1200 ? "13px" : "15px",
                            ml: "12px",
                          }}
                        >
                          {product.title}
                        </Typography>
                        <Box sx={{ ml: "20px" }}>
                          <ProductPrice
                            price={product?.price}
                            style={priceIndividualStyle}
                          />
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            bgcolor: "white",
                            borderRadius: "10px",
                            display: "flex",
                            alignItems: "center",
                            width: isLTE700
                              ? "4.5rem"
                              : isLTE1200
                              ? "5rem"
                              : "6rem",
                            height: "25px",
                            ml: "1rem",
                            my: isLTE650 && "8px",
                            justifyContent: "center",
                          }}
                        >
                          <IconButton
                            onClick={() => handleClickRemove(product)}
                          >
                            <RemoveIcon
                              sx={{ fontSize: isLTE700 ? "13px" : "15px" }}
                            />
                          </IconButton>

                          <Typography
                            sx={{ fontSize: isLTE700 ? "13px" : "15px" }}
                          >
                            {product.cantidad}
                          </Typography>

                          <IconButton onClick={() => handleClickAdd(product)}>
                            <AddIcon
                              sx={{ fontSize: isLTE700 ? "13px" : "15px" }}
                            />
                          </IconButton>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            mr: "20px",
                            alignItems: "center",
                          }}
                        >
                          {!isLTE424 ? (
                            <Typography
                              sx={{ fontSize: isLTE650 && "14px", mr: "10px" }}
                            >
                              SubTotal:
                            </Typography>
                          ) : (
                            <Typography
                              sx={{
                                fontSize: isLTE650 && "14px",
                                mr: isLTE424 ? "5px" : "10px",
                              }}
                            >
                              st:
                            </Typography>
                          )}
                          {calcularSubTotal(index)}
                        </Box>
                      </Box>
                    </Box>
                  )}

                  {!isLTE650 && (
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        mr: "20px",
                      }}
                    >
                      <Box sx={{ width: "40%" }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: isLTE1200 ? "13px" : "15px",
                            ml: "12px",
                          }}
                        >
                          {product.title}
                        </Typography>
                      </Box>
                      <Box sx={{ ml: "24px" }}>
                        <ProductPrice
                          price={product?.price}
                          style={priceIndividualStyle}
                        />
                      </Box>
                      <Box
                        sx={{
                          bgcolor: "white",
                          borderRadius: "10px",
                          display: "flex",
                          alignItems: "center",
                          width: isLTE700
                            ? "4.5rem"
                            : isLTE1200
                            ? "5rem"
                            : "6rem",
                          height: "25px",
                          ml: "1rem",
                          justifyContent: "center",
                        }}
                      >
                        <IconButton onClick={() => handleClickRemove(product)}>
                          <RemoveIcon
                            sx={{ fontSize: isLTE700 ? "13px" : "15px" }}
                          />
                        </IconButton>

                        <Typography
                          sx={{ fontSize: isLTE700 ? "13px" : "15px" }}
                        >
                          {product.cantidad}
                        </Typography>

                        <IconButton onClick={() => handleClickAdd(product)}>
                          <AddIcon
                            sx={{ fontSize: isLTE700 ? "13px" : "15px" }}
                          />
                        </IconButton>
                      </Box>

                      {/* <Box
                      sx={{
                        display: "flex",
                        // justifyContent: "space-between",
                        mb: "15px",
                      }}
                    > */}

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
                  )}
                </Box>
                <Divider sx={{ width: "95%", height: "1px", m: "auto" }} />
              </Box>
            ))}
        </Box>

        <Box
          sx={{
            width: isLTE700
              ? "99%"
              : isLTE900
              ? "95%"
              : isLTE999
              ? "32%"
              : isLTE1340
              ? "30%"
              : "25%",
            display: "flex",
            height: "20rem",
            position: "sticky",
            top: "10px",
            flexDirection: "column",
            alignItems: "center",
            mb: isLTE900 && "30px",
          }}
        >
          <Box sx={{ bgcolor: "#F5F5F5", width: "100%", display: "flex" }}>
            <Typography
              sx={{
                m: "auto",
                my: "10px",
                fontWeight: "bold",
                fontSize: isLTE700 ? "14px" : isLTE1200 && "15px",
              }}
            >
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
                <Typography
                  sx={{ fontSize: isLTE700 ? "15px" : isLTE1440 && "16px" }}
                >
                  SubTotal general:
                </Typography>
                {calcularValorTotal(subTotalGeneralStyle)}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{ fontSize: isLTE700 ? "15px" : isLTE1440 && "16px" }}
                >
                  Descuentos:
                </Typography>
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
              <Typography
                sx={{
                  fontSize: isLTE700 ? "16.5px" : isLTE1440 ? "18px" : "20px",
                  fontWeight: "bold",
                }}
              >
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
            <Button
              variant="contained"
              sx={{
                width: "60%",
                borderRadius: "30px",
                mt: "10px",
                fontSize: isLTE700 && "13px",
              }}
              onClick={() => handleCompra()}
            >
              Finalizar Compra
            </Button>

            <Button
              component={NavLink}
              to="/"
              sx={{ color: "inherit", textDecoration: "none", mt: "3px" }}
            >
              <Typography
                sx={{
                  fontSize: isLTE1200 ? "12px" : "12.5px",
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
