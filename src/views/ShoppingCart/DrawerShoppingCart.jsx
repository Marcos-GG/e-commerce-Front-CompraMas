/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ProductPrice from "../../components/ProductPrice";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addProduct,
  removeProduct,
} from "../../Redux/actions/ShoppingCartAction";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const DrawerShoppingCart = ({
  handleDrawerToggleCarrito,
  openCarrito,
  ShoppingCartProducts,
}) => {
  const isLTE424 = useMediaQuery("(max-width: 424px)");
  const isLTE500 = useMediaQuery("(max-width: 500px)");
  const isLTE530 = useMediaQuery("(max-width: 530px)");
  const isLTE600 = useMediaQuery("(max-width: 600px)");
  const isLTE650 = useMediaQuery("(max-width: 650px)");
  const isLTE700 = useMediaQuery("(max-width: 700px)");
  const isLTE1440 = useMediaQuery("(max-width:1440px)");
  const isLTE1200 = useMediaQuery("(max-width:1200px)");

  const dispatch = useDispatch();
  const handleClickAdd = (product) => {
    dispatch(addProduct(product));
  };

  const handleClickRemove = (product) => {
    dispatch(removeProduct(product));
  };
  // funciones para calcular precios y dar estilos
  const calcularValorTotal = () => {
    const preciosTotales = ShoppingCartProducts?.reduce(
      (total, products) => total + products.price * products.cantidad,
      0
    );

    const totalStyle = {
      fontSize: isLTE530 ? "25px" : "30px",
    };

    const precioTotal = (
      <ProductPrice price={preciosTotales} style={totalStyle} />
    );
    return precioTotal;
  };

  const calcularSubTotal = (index) => {
    let subTotales = [];

    ShoppingCartProducts?.forEach((product) => {
      const subTotal = product.price * product.cantidad;
      subTotales.push(subTotal);
    });

    const subTotalStyle = {
      fontSize: isLTE530 ? "12.5px" : "14px",
      fontWeight: "bold",
    };
    const precioSubTotal = (
      <ProductPrice price={subTotales[index]} style={subTotalStyle} />
    );

    return precioSubTotal;
  };

  const priceStyle = {
    fontSize: isLTE530 ? "13px" : "14px",
  };

  const priceIndividualStyle = {
    fontSize: isLTE1440 ? "14px" : "18px",
  };
  return (
    <Box>
      <Box
        sx={{
          mb: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: isLTE500 ? "center" : "flex-end",
        }}
      >
        <Box
          sx={{
            display: "flex",
            mt: "1rem",
            mr: "1rem",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <Drawer
            anchor="right"
            open={openCarrito}
            onClose={handleDrawerToggleCarrito}
          >
            <Box
              sx={{
                width: isLTE530 ? "100%" : isLTE600 ? "25rem" : "30rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                overflow: "hidden",
                alignItems: "center",
                bgcolor: "#F5F5F5",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  width: isLTE600 ? "100%" : "98%",
                  height: "80%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body"
                  component="p"
                  sx={{
                    m: "20px 0 10px 0",
                    fontSize: isLTE530 ? "17px" : "20px",
                  }}
                >
                  MI COMPRA
                </Typography>

                <Divider sx={{ height: "3px", width: "90%" }} />

                <Box
                  sx={{
                    width: "95%",
                    mt: "10px",
                    height: "100%",
                    overflow: "auto",
                  }}
                >
                  {ShoppingCartProducts &&
                    ShoppingCartProducts?.length > 0 &&
                    ShoppingCartProducts.map((product, index) => (
                      <Box
                        key={product.id}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Box sx={{ display: "flex", width: "100%" }}>
                          <Box
                            component="img"
                            src={product.image1}
                            sx={{
                              width: isLTE530
                                ? "86px"
                                : isLTE530
                                ? "90px"
                                : "100px",
                              maxHeight: isLTE530 && "86px",
                            }}
                          />

                          {isLTE650 ? (
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
                                      sx={{
                                        fontSize: isLTE700 ? "13px" : "15px",
                                      }}
                                    />
                                  </IconButton>

                                  <Typography
                                    sx={{
                                      fontSize: isLTE700 ? "13px" : "15px",
                                    }}
                                  >
                                    {product.cantidad}
                                  </Typography>

                                  <IconButton
                                    onClick={() => handleClickAdd(product)}
                                  >
                                    <AddIcon
                                      sx={{
                                        fontSize: isLTE700 ? "13px" : "15px",
                                      }}
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
                                      sx={{
                                        fontSize: isLTE650 && "14px",
                                        mr: "10px",
                                      }}
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
                          ) : (
                            <Box
                              sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-evenly",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "15px",
                                  ml: "0.5rem",
                                }}
                              >
                                {product.title}
                              </Typography>
                              <Box sx={{ display: "flex" }}>
                                <Typography
                                  sx={{
                                    mx: "0.5rem",
                                    fontSize: "14px",
                                  }}
                                >
                                  precio:
                                </Typography>
                                {
                                  <ProductPrice
                                    price={product?.price}
                                    style={priceStyle}
                                  />
                                }
                              </Box>

                              <Box
                                sx={{
                                  display: "flex",

                                  justifyContent: "space-between",
                                }}
                              >
                                <Box
                                  sx={{
                                    bgcolor: "white",
                                    borderRadius: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    width: "4rem",
                                    height: "25px",
                                    ml: "1rem",
                                    justifyContent: "center",
                                  }}
                                >
                                  <IconButton
                                    onClick={() => handleClickRemove(product)}
                                  >
                                    <RemoveIcon sx={{ fontSize: "15px" }} />
                                  </IconButton>

                                  <Typography sx={{ fontSize: "15px" }}>
                                    {product.cantidad}
                                  </Typography>

                                  <IconButton
                                    onClick={() => handleClickAdd(product)}
                                  >
                                    <AddIcon sx={{ fontSize: "15px" }} />
                                  </IconButton>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",

                                    alignItems: "center",
                                    width: "55%",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontSize: "13px",
                                      mr: "1rem",

                                      fontWeight: "bold",
                                    }}
                                  >
                                    subTotal:
                                  </Typography>
                                  <Box sx={{}}>{calcularSubTotal(index)}</Box>
                                </Box>
                              </Box>
                            </Box>
                          )}
                        </Box>

                        <Divider
                          sx={{
                            width: "95%",
                            height: "2px",
                            my: "11px",
                          }}
                        />
                      </Box>
                    ))}
                </Box>
              </Box>

              <Box
                sx={{
                  width: "93%",
                  bgcolor: "#F5F5F5",
                  height: "20%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ m: "10px 0 0 20px", fontSize: isLTE530 && "20px" }}
                  >
                    Total
                  </Typography>
                  <Box sx={{ m: "5px 0 20px 0" }}>{calcularValorTotal()}</Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "45%",
                  }}
                >
                  <Button
                    variant="contained"
                    component={NavLink}
                    to="/carrito"
                    sx={{
                      width: "60%",
                      m: isLTE530 ? "4px 0 4px 0" : "10px 0 5px 0",
                      borderRadius: "30px",
                      fontSize: isLTE530 && "13px",
                    }}
                  >
                    Iniciar Compra
                  </Button>

                  <Button
                    onClick={handleDrawerToggleCarrito}
                    sx={{ color: "inherit", textDecoration: "none" }}
                  >
                    <Typography
                      sx={{
                        fontSize: isLTE530 ? "12px" : "13px",
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
          </Drawer>
        </Box>
      </Box>
    </Box>
  );
};

export default DrawerShoppingCart;
