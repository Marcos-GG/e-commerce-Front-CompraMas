/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getProducts,
  putProduct,
  // moveToDeactivate,
} from "../Redux/actions/productsActions";
import SearchBarProduct from "./SearchBarProduct";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ProductPrice from "./ProductPrice";
import EditNoteIcon from "@mui/icons-material/EditNote";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DetailProduct from "../views/DetailProduct/DetailProduct";
import { getCategory, getGender } from "../Redux/actions/CategoryGender";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Respuesta from "./Respuesta";

const ProductsAdmin = ({ products, productosFiltrados }) => {
  const isLTE370 = useMediaQuery("(max-width:370px)");
  const isLTE412 = useMediaQuery("(max-width:412px)");
  const isLTE600 = useMediaQuery("(max-width:600px)");
  const isLTE768 = useMediaQuery("(max-width:768px)");
  const isLTE1023 = useMediaQuery("(max-width:1023px)");
  const isLTE1300 = useMediaQuery("(max-width:1300px)");
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categoryGender.category);
  const genders = useSelector((state) => state.categoryGender.gender);

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getGender());
  }, [getCategory, getGender]);

  const [productDetail, setProductDetail] = useState(null);

  // const products = useSelector((state) => state.products.products);
  // const productosFiltrados = useSelector(
  //   (state) => state.products.productsFiltered
  // );

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const deactiveProduct = (id, product) => {
    setProductDetail(null);
    const updateProduct = { ...product, status: false };
    dispatch(putProduct(id, updateProduct, "false"));
  };

  const activateProduct = (id, product) => {
    const updateProduct = { ...product, status: true };
    dispatch(putProduct(id, updateProduct, true));
  };

  const handlerVerDetail = (product) => {
    setProductDetail(product);
  };

  const [formEdit, setFormEdit] = useState(false);

  const renderProductsMap = (products) => {
    return products.map((product) => (
      <Box
        key={product?.id}
        sx={{
          display: "flex",
          justifyContent: isLTE1023 ? "start" : "space-evenly",
          m: isLTE1023 ? "5px 10px 4px 10px" : "8px 10px 4px 10px",
          border: "1px solid",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => handlerVerDetail(product)}
      >
        <Box
          component="img"
          src={product?.image1}
          sx={{
            width: isLTE1023 ? "6rem" : isLTE1300 ? "8rem" : "9rem",
            maxWidth: isLTE1023 ? "6rem" : isLTE1300 ? "8rem" : "9rem",
            borderRadius: "10px 0 0 10px",
            objectFit: "contain",
          }}
        />
        <Box
          sx={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            overflow: "hidden",
          }}
        >
          <Box sx={{ m: "5px" }}>
            <Typography
              variant="h6"
              sx={{
                fontSize: isLTE600 ? "14.5px" : isLTE1300 && "16px",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {product?.title}
            </Typography>
            <Box sx={{ m: "2px 0 0 10px" }}>
              <ProductPrice price={product?.price} />
            </Box>
          </Box>

          <Box
            sx={{
              bgcolor: "#E3E6E7",
              height: isLTE1023 ? "50%" : "30%",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Tooltip title="editar" arrow placement="top">
              <IconButton
                sx={{ width: "40px", height: "40px" }}
                onClick={() => handlerEditar()}
              >
                <EditNoteIcon sx={{ fontSize: isLTE1300 && "20px" }} />
              </IconButton>
            </Tooltip>

            <Tooltip title="ver más" arrow placement="top">
              <NavLink to={`/detail/${product?.id}`}>
                <IconButton
                  sx={{ width: "40px", height: "40px" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <VisibilityIcon sx={{ fontSize: isLTE1300 && "20px" }} />
                </IconButton>
              </NavLink>
            </Tooltip>

            {product?.status && (
              <Tooltip title="suspender" arrow placement="top">
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    deactiveProduct(product.id, product);
                  }}
                  sx={{ width: "40px", height: "40px" }}
                >
                  <RemoveCircleOutlineIcon
                    sx={{ fontSize: isLTE1300 && "20px" }}
                  />
                </IconButton>
              </Tooltip>
            )}
            {!product?.status && (
              <Tooltip title="reactivar" arrow placement="top">
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    activateProduct(product.id, product);
                  }}
                  sx={{ width: "40px", height: "40px" }}
                >
                  <ControlPointIcon sx={{ fontSize: isLTE1300 && "20px" }} />
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title="eliminar" arrow placement="top">
              <IconButton
                sx={{ width: "40px", height: "40px" }}
                onClick={(e) => e.stopPropagation()}
              >
                <DeleteForeverIcon sx={{ fontSize: isLTE1300 && "20px" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    ));
  };

  const [form, setForm] = useState({
    title: productDetail?.title || "",
    image1: productDetail?.image1 || "",
    image2: productDetail?.image2 || "",
    image3: productDetail?.image3 || "",
    image4: productDetail?.image4 || "",
    description: productDetail?.description || "",
    // stock: "",
    price: productDetail?.price || "",
    gender: productDetail?.gender || "",
    category: productDetail?.category || "",
  });

  useEffect(() => {
    if (productDetail) {
      setForm({
        title: productDetail?.title || "",
        image1: productDetail?.image1 || "",
        image2: productDetail?.image2 || "",
        image3: productDetail?.image3 || "",
        image4: productDetail?.image4 || "",
        description: productDetail?.description || "",
        price: productDetail?.price || "",
        gender: productDetail?.gender || "",
        category: productDetail?.category || "",
      });
    }
  }, [formEdit]);

  const handlerEditar = () => {
    setFormEdit(!formEdit);
  };

  const formHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const [image2, setImage2] = useState(false);
  const handlerImage2 = () => {
    setImage2(!image2);
    setImage3(false);
    setImage4(false);
  };

  const [image3, setImage3] = useState(false);
  const handlerImage3 = () => {
    setImage3(!image3);
    setImage4(false);
  };

  const [image4, setImage4] = useState(false);
  const handlerImage4 = () => {
    setImage4(!image4);
  };

  const handlerVaciarForm = () => {
    setForm({
      title: "",
      image1: "",
      image2: "",
      image3: "",
      image4: "",
      description: "",
      price: "",
      gender: "",
      category: "",
    });
  };
  const handlerSubmit = (event) => {
    event.preventDefault();
  };

  /// control del mesnaje success / error

  // const [open, setOpen] = useState(false);
  // const [mensaje, setMensaje] = useState("");
  // const [tipoMensaje, setTipo] = useState("success");

  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpen(false);
  // };

  const handlerPutProduct = () => {
    dispatch(putProduct(productDetail?.id, form))
      .then(() => {
        // La solicitud PUT se ha completado con éxito
        // Actualizar el estado local con la nueva información del producto
        setFormEdit(false);
        setProductDetail((prevProductDetail) => ({
          ...prevProductDetail,
          ...form, // Actualizar solo las propiedades que están en el formulario
        }));

        // actualizamos estados para el mensaje

        // Puedes realizar un dispatch de getProducts aquí si es necesario
        dispatch(getProducts());
      })
      .catch((error) => {
        // Manejar errores, si es necesario
        console.error("Error al actualizar el producto:", error);
      });
  };

  const valueForm = Object.values(form).every((value) => !value);

  return (
    <Box>
      <Respuesta />
      <Box sx={{ m: "20px 0 20px 10px" }}>
        <SearchBarProduct />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: isLTE1023 && "column",
          justifyContent: "space-between",
        }}
      >
        {productosFiltrados && productosFiltrados.length > 0 ? (
          <Box
            sx={{
              bgcolor: "#F5F5F5",
              width: isLTE1023 ? "100%" : "43%",
              overflow: "auto",
              maxHeight: "44rem",
            }}
          >
            {renderProductsMap(productosFiltrados)}
          </Box>
        ) : (
          <Box
            sx={{
              bgcolor: "#F5F5F5",
              width: isLTE1023 ? "100%" : "43%",
              overflow: "auto",
              maxHeight: "44rem",
            }}
          >
            {renderProductsMap(products)}
          </Box>
        )}

        <Box
          sx={{
            mt: isLTE1023 && "6px",
            width: isLTE1023 ? "100%" : "57%",
            bgcolor: "#F5F5F5",
            ml: isLTE1023 ? 0 : "5px",
          }}
        >
          {productDetail ? (
            <Box>
              <DetailProduct product={productDetail} />
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "44rem",
                backgroundColor: "#F5F5F5",
                boxShadow: "10px 10px 15px #888888",
                backgroundImage: 'url("/logoblanco.svg")',
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></Box>
          )}
        </Box>
      </Box>
      {formEdit && (
        <Box
          sx={{
            position: "fixed",
            top: 0, // Centrar verticalmente
            left: 0, // Centrar horizontalmente
            backdropFilter: "blur(10px)",
            zIndex: 5,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: isLTE600 && "column" }}>
            <IconButton
              sx={{
                alignSelf: "flex-start",
                mt: "-30px",
                width: "18px",
                height: "18px",
              }}
              onClick={() => handlerEditar()}
            >
              <CloseIcon sx={{ fontSize: isLTE600 && "18px" }} />
            </IconButton>

            <form onSubmit={handlerSubmit}>
              <Box
                sx={{
                  width: isLTE370
                    ? "19rem"
                    : isLTE412
                    ? "22rem"
                    : isLTE600
                    ? "25rem"
                    : isLTE768
                    ? "27rem"
                    : isLTE1023
                    ? "33rem"
                    : "40rem",
                  display: "flex",
                  bgcolor: "#F5F5F5",
                  borderRadius: "5px",
                  boxShadow: "10px 10px 15px #888888",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "100%",
                  minHeight: isLTE1023 && "42rem",
                  my: "10px",
                  // mx: /*  isLTE500 ? "15px" : isLTE1023 &&  */ "10%",
                  // m: "30px 30px 0 30px",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width:
                        /* isLTE1300 ? "94%" : isLTE1700 ? "90%" : */ isLTE768
                          ? "95%"
                          : "80%",
                      my: /*  isLTE500 ? "2px" : */ isLTE600 ? "1px" : "3px",
                    }}
                  >
                    <TextField
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={formHandler}
                      placeholder="Título"
                      InputProps={{
                        sx: {
                          bgcolor: "white",
                          width: "100%",
                          mt: "20px",
                          height: "2.5rem",
                          fontSize: isLTE768 && "13.5px",
                        },
                      }}
                      sx={{ width: "100%" }}
                    />
                  </Box>
                  <Box
                    sx={{
                      width:
                        /* isLTE1300 ? "94%" : isLTE1700 ? "90%" : */ isLTE768
                          ? "95%"
                          : "80%",
                      display: "flex",
                      alignItems: "center",
                      my: /*  isLTE500 ? "2px" :  */ isLTE600 ? "1px" : "3px",
                    }}
                  >
                    <TextField
                      type="text"
                      name="image1"
                      value={form.image1}
                      onChange={formHandler}
                      placeholder="imagen Principal"
                      InputProps={{
                        sx: {
                          bgcolor: "white",
                          width: "100%",
                          mt: "20px",
                          height: "2.5rem",
                        },
                      }}
                      sx={{ width: "100%" }}
                    />
                    <IconButton sx={{ mt: "20px" }} onClick={handlerImage2}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                  {image2 && (
                    <Box
                      sx={{
                        width:
                          /*  isLTE1300 ? "94%" : isLTE1700 ? "90%" : */ isLTE768
                            ? "95%"
                            : "80%",
                        display: "flex",
                        alignItems: "center",
                        my: /*  isLTE500 ? "2px" : */ isLTE600 ? "1px" : "3px",
                      }}
                    >
                      <TextField
                        type="text"
                        name="image2"
                        value={form.image2}
                        onChange={formHandler}
                        placeholder="segunda imagen"
                        InputProps={{
                          sx: {
                            bgcolor: "white",
                            width: "100%",
                            mt: "20px",
                            height: "2.5rem",
                          },
                        }}
                        sx={{ width: "100%" }}
                      />
                      <IconButton sx={{ mt: "20px" }} onClick={handlerImage3}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                  )}
                  {image3 && (
                    <Box
                      sx={{
                        width:
                          /*  isLTE1300 ? "94%" : isLTE1700 ? "90%" :  */ isLTE768
                            ? "95%"
                            : "80%",
                        display: "flex",
                        alignItems: "center",
                        my: /* isLTE500 ? "2px" : */ isLTE600 ? "1px" : "3px",
                      }}
                    >
                      <TextField
                        type="text"
                        name="image3"
                        value={form.image3}
                        onChange={formHandler}
                        placeholder="tercera imagen"
                        InputProps={{
                          sx: {
                            bgcolor: "white",
                            width: "100%",
                            mt: "20px",
                            height: "2.5rem",
                          },
                        }}
                        sx={{ width: "100%" }}
                      />
                      <IconButton sx={{ mt: "20px" }} onClick={handlerImage4}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                  )}
                  {image4 && (
                    <Box
                      sx={{
                        width:
                          /*  isLTE1300 ? "94%" : isLTE1700 ? "90%" : */ isLTE768
                            ? "95%"
                            : "80%",
                        my: /*  isLTE500 ? "2px" : */ isLTE600 ? "1px" : "3px",
                      }}
                    >
                      <TextField
                        type="text"
                        name="image4"
                        value={form.image4}
                        onChange={formHandler}
                        placeholder="ultima imagen"
                        InputProps={{
                          sx: {
                            bgcolor: "white",
                            width: "100%",
                            mt: "20px",
                            height: "2.5rem",
                          },
                        }}
                        sx={{ width: "100%" }}
                      />
                    </Box>
                  )}
                  <Box
                    sx={{
                      width:
                        /* isLTE1300 ? "94%" : isLTE1700 ? "90%" : */ isLTE768
                          ? "95%"
                          : "80%",
                      my: /*  isLTE500 ? "2px" : */ isLTE600 ? "1px" : "3px",
                    }}
                  >
                    <TextField
                      name="description"
                      value={form.description}
                      onChange={formHandler}
                      multiline
                      rows={4}
                      placeholder="description"
                      variant="outlined"
                      InputProps={{
                        sx: {
                          bgcolor: "white",
                          width: "100%",
                          mt: "20px",
                          height: "6rem",
                        },
                      }}
                      sx={{ width: "100%" }}
                    />
                  </Box>
                  <Box
                    sx={{
                      width:
                        /* isLTE1300 ? "94%" : isLTE1700 ? "90%" :  */ isLTE768
                          ? "95%"
                          : "80%",
                      my: /*  isLTE500 ? "2px" :  */ isLTE600 ? "1px" : "3px",
                    }}
                  >
                    <TextField
                      type="text"
                      name="price"
                      value={form.price}
                      onChange={formHandler}
                      placeholder="Precio"
                      InputProps={{
                        sx: {
                          bgcolor: "white",
                          width: "100%",
                          mt: "20px",
                          height: "2.5rem",
                        },
                      }}
                      sx={{ width: "100%" }}
                    />
                  </Box>
                  <Box
                    sx={{
                      width:
                        /*  isLTE1300 ? "94%" : isLTE1700 ? "90%" : */ isLTE768
                          ? "95%"
                          : "80%",
                      my: /*  isLTE500 ? "2px" : */ isLTE600 ? "1px" : "3px",
                    }}
                  >
                    <Select
                      name="gender"
                      value={form.gender}
                      onChange={formHandler}
                      displayEmpty
                      placeholder="Género"
                      sx={{
                        bgcolor: "white",
                        height: "2.5rem",
                        width: "100%",
                        mt: "20px",
                      }}
                    >
                      <MenuItem value="">Genero</MenuItem>
                      {genders &&
                        genders.map((gender) => (
                          <MenuItem key={gender.id} value={gender.gender}>
                            {gender.gender}
                          </MenuItem>
                        ))}
                    </Select>
                  </Box>
                  <Box
                    sx={{
                      width:
                        /* isLTE1300 ? "94%" : isLTE1700 ? "90%" : */ isLTE768
                          ? "95%"
                          : "80%",
                      my: /*  isLTE500 ? "2px" : */ isLTE600 ? "1px" : "3px",
                    }}
                  >
                    <Select
                      name="category"
                      value={form.category}
                      onChange={formHandler}
                      displayEmpty
                      placeholder="Categoría"
                      sx={{
                        height: "2.5rem",
                        bgcolor: "white",

                        width: "100%",
                        mt: "20px",
                      }}
                    >
                      <MenuItem value="">Categoria</MenuItem>
                      {categories &&
                        categories.map((category) => (
                          <MenuItem key={category.id} value={category.name}>
                            {category.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      width: /* isLTE1300 ? "55%" :  */ "40%",
                      mt: "20px",
                      fontSize: /* isLTE500 && */ isLTE600 ? "10.9px" : "12px",
                    }}
                    disabled={valueForm}
                    onClick={() => handlerPutProduct(form)}
                  >
                    Editar Publicación
                  </Button>

                  <Button
                    sx={{
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: /* isLTE500 ? "10.5px" :  */ isLTE600
                        ? "10px"
                        : "10.8px",
                    }}
                    onClick={() => handlerVaciarForm()}
                  >
                    Limpiar formulario
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProductsAdmin;
