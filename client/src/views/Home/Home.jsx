/* eslint-disable react-hooks/exhaustive-deps */
import Style from "./Home.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getProducts } from "../../Redux/actions/productsActions";
import CardContainer from "../../components/CardContainer";
import Filtros from "../../components/Filtros";
import {
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery /* useTheme */,
} from "@mui/material";
import { GET_PRODUCTS } from "../../Redux/actionsTypes/ProductsActionTypes";
import SearchBarProduct from "../../components/SearchBarProduct";
import { NavLink } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import {
  addProduct,
  removeProduct,
} from "../../Redux/actions/ShoppingCartAction";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ProductPrice from "../../components/ProductPrice";

function Home() {
  // const theme = useTheme();
  const isLTE1000 = useMediaQuery("(max-width:1000px)");
  const isLTE1700 = useMediaQuery("(max-width:1700px)");
  const isLTE1025 = useMediaQuery("(max-width:1025px)");

  const ShoppingCartProducts = useSelector(
    (state) => state.shoppingCart.products
  );
  console.log(ShoppingCartProducts, "Shopping Cart");

  const cantidadCarrito =
    ShoppingCartProducts?.length > 0
      ? `${ShoppingCartProducts?.reduce(function (acc, obj) {
          return acc + (obj?.cantidad || 1);
        }, 0)}`
      : "";

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const productosFiltrados = useSelector(
    (state) => state.products.productsFiltered
  );

  const [productsFiltered, setProductsFiltered] = useState([]);

  const [, setError] = useState(null);

  useEffect(() => {
    try {
      const persistedData = localStorage.getItem("persist:root");

      if (persistedData) {
        const parsedData = JSON.parse(persistedData);

        const localProducts =
          parsedData.products && JSON.parse(parsedData.products).products;

        if (localProducts || localProducts.length > 0) {
          dispatch({ type: GET_PRODUCTS, payload: localProducts });
        }
      }

      dispatch(getProducts());
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    setProductsFiltered(productosFiltrados);
  }, [productosFiltrados]);

  // vida del boton filtros
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const [openCarrito, setOpenCarrito] = useState(false);

  const handleDrawerToggleCarrito = () => {
    setOpenCarrito(!openCarrito);
  };

  // agregar o quitar productos
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
      fontSize: "30px",
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
      fontSize: "14px",
      fontWeight: "bold",
    };
    const precioSubTotal = (
      <ProductPrice price={subTotales[index]} style={subTotalStyle} />
    );

    return precioSubTotal;
  };

  const priceStyle = {
    fontSize: "14px",
  };

  return (
    <Box
      className={Style}
      sx={{
        position: "relative",
        height: "calc(100vh - 3.2rem)",
      }}
    >
      <Box
        sx={{
          mb: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
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
          <Badge
            color="primary"
            badgeContent={cantidadCarrito >= 1 ? cantidadCarrito : null}
          >
            <IconButton
              onClick={cantidadCarrito > 0 && handleDrawerToggleCarrito}
            >
              <ShoppingBagIcon sx={{ fontSize: "1.6rem" }} color="action" />
            </IconButton>

            <Drawer
              anchor="right"
              open={openCarrito}
              onClose={handleDrawerToggleCarrito}
            >
              <Box
                sx={{
                  width: "30rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    width: "98%",
                    height: "80%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body"
                    component="p"
                    sx={{ m: "20px 0 10px 0", fontSize: "20px" }}
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
                              sx={{ width: "100px" }}
                            />

                            <Box
                              sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-evenly",
                              }}
                            >
                              <Typography
                                sx={{ fontSize: "15px", ml: "0.5rem" }}
                              >
                                {product.title}
                              </Typography>
                              <Box sx={{ display: "flex" }}>
                                <Typography
                                  sx={{ mx: "0.5rem", fontSize: "14px" }}
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
                                    justifyContent: "center",
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
                                  {calcularSubTotal(index)}
                                </Box>
                              </Box>
                            </Box>
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
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="h5" sx={{ m: "10px 0 0 20px" }}>
                      Total
                    </Typography>
                    <Box sx={{ mr: "15px" }}>{calcularValorTotal()}</Box>
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
                        m: "10px 0 5px 0",
                        borderRadius: "30px",
                      }}
                    >
                      Inicicar Compra
                    </Button>

                    <Button
                      onClick={handleDrawerToggleCarrito}
                      sx={{ color: "inherit", textDecoration: "none" }}
                    >
                      <Typography
                        sx={{
                          fontSize: "13px",
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
          </Badge>
          <SearchBarProduct />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: isLTE1000 ? "column" : "",
        }}
      >
        {isLTE1000 ? (
          <Box
            sx={{
              bgcolor: "#f5f5f5",
              boxShadow: "0px 5px 15px #888888;",
              mb: "2rem",
              width: open ? "100vw" : "12rem",
              transition: "width 0.6s ease",
            }}
          >
            <Filtros
              open={open}
              handleDrawerToggle={handleDrawerToggleCarrito}
            />
          </Box>
        ) : (
          <Box
            sx={{
              background: "#f5f5f5",
              padding: "0 15px 0 15px",
              width: "19rem",
              borderRadius: "0 5px 5px 0",
              border: "1px solid #00CCFD",
              minWidth: "12rem",
              maxHeight: "37rem",
              minHeight: "37rem",
              marginRight: isLTE1025 ? "3.5rem" : isLTE1700 ? "3.5rem" : "",
            }}
          >
            <Filtros open={open} handleDrawerToggle={handleDrawerToggle} />
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "1",
            margin: "0 auto",
          }}
        >
          <CardContainer
            products={
              productsFiltered && productsFiltered.length === 0
                ? products
                : productosFiltrados
            }
          />
        </Box>
      </Box>
      <Box
        sx={{
          position: "fixed",
          right: 20,
          bottom: 10,
        }}
      >
        <IconButton sx={{}}>
          <NavLink
            to="https://wa.me/541127147123?text=¡Hola! me gustaria tener atensión personalizada."
            target="_blank"
          >
            <WhatsAppIcon
              sx={{
                fontSize: "2.80rem",
                bgcolor: "#00BD07",
                color: "white",
                borderRadius: "50%",
                p: "5px",
              }}
            />
          </NavLink>
        </IconButton>
      </Box>
    </Box>
  );
}

export default Home;
