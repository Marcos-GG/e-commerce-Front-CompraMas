import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearProductosFiltrados,
  getProductId,
  getProducts,
} from "../../Redux/actions/productsActions";
import { useEffect, useState } from "react";
import RelatedProducts from "../../components/RelatedProducts";
import CommentProducts from "../../components/CommentProducts";
import AnswerComment from "../../components/AnswerComment";
import { addProduct } from "../../Redux/actions/ShoppingCartAction";
import { jwtDecode } from "jwt-decode";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ProductPrice from "../../components/ProductPrice";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CompleteOutfits from "../../components/completeOutfits";
import CommentDesplegable from "../../components/CommentDesplegable";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

function DetailProduct() {
  const isLTE454 = useMediaQuery("(max-width:454px)");
  const isLTE600 = useMediaQuery("(max-width:600px)");
  const isLTE768 = useMediaQuery("(max-width:768px)");
  const isLTE1000 = useMediaQuery("(max-width:1000px)");
  const isLTE1200 = useMediaQuery("(max-width:1200px)");
  const isLTE1250 = useMediaQuery("(max-width:1250px)");
  const isLTE1400 = useMediaQuery("(max-width:1400px)");
  const isLTE1520 = useMediaQuery("(max-width:1520px)");

  const { id } = useParams();
  const dispatch = useDispatch();

  const productId = useSelector((state) => state.products.productId);
  console.log(productId, "productId");

  const products = useSelector((state) => state.products.products);

  const [fotoPrincipal, setFotoPrincipal] = useState("");
  console.log(fotoPrincipal, "fotoPrincipal");
  const [fotoLength, setFotoLength] = useState([]);

  useEffect(() => {
    if (productId) {
      const imageArray = [
        productId?.image1,
        productId?.image2,
        productId?.image3,
        productId?.image4,
      ];
      const validImages = imageArray.filter((image) => image);
      setFotoLength(validImages);
      setFotoPrincipal(validImages[0]); // Actualizar fotoPrincipal con la primera imagen válida
    }
  }, [productId]);

  /// productos relacionados
  const category = productId?.category;
  const gender = productId?.gender;
  const IdProduct = productId?.id;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch, id]);

  //limpiamos filtros aplicados :
  useEffect(() => {
    return () => {
      // Limpiar productos filtrados al salir del componente de detalle
      dispatch(clearProductosFiltrados());
    };
  }, [dispatch]);
  ///////
  const token = localStorage.getItem("token");

  const decodeToken = jwtDecode(token);
  const userId = decodeToken.id;

  useEffect(() => {
    dispatch(getProductId(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickAdd = (product) => {
    dispatch(addProduct(product));
  };

  const priceStyle = {
    fontSize: isLTE454 ? "1.6rem" : "2.2rem",
  };

  const handleImageClick = (image) => {
    setFotoPrincipal(image);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Alinea horizontalmente al centro
          mx: isLTE1400 ? "0" : "5rem",
          mt: "3rem",
          flexDirection: isLTE768 && "column",
          alignItems: isLTE768 && "center",
          gap: isLTE768 && "30px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
            width: "100%",
            maxWidth: "100rem",
            maxHeight: "30rem",
          }}
        >
          <img
            src={fotoPrincipal}
            alt={productId?.title}
            style={{
              minWidth: "18rem",
              maxWidth: isLTE768 ? "55%" : "100%",
              maxHeight: isLTE768 ? "55%" : "100%",
              height: "auto",
              position: isLTE768 ? "" : "absolute",
              top: "50%",
              left: "50%",
              transform: !isLTE768 && "translate(-50%, -50%)",
            }}
          />

          <Box
            sx={{
              gap: "12px",
              position: "absolute",
              bottom: 0,
              left: "50%",
              height: "25px",
              transform: "translateX(-50%)",
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem", // Espacio entre la imagen y los botoness
            }}
          >
            {fotoLength.map((image, index) => (
              <IconButton
                onClick={() => handleImageClick(image)}
                key={index}
                sx={{}}
              >
                {fotoPrincipal === image ? (
                  <CircleIcon sx={{ width: "12px" }} />
                ) : (
                  <CircleOutlinedIcon sx={{ width: "12px" }} />
                )}
              </IconButton>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            maxwidth: "65rem",
          }}
        >
          <Box sx={{ alignSelf: "flex-end" }}>
            <Typography
              sx={{
                display: "flex",
                fontSize: isLTE1000 ? "10.9px" : "13px",
                fontWeight: "bold",
                color: "gray",
                fontStyle: "italic",
                mr: "15px",
              }}
            >
              {
                <FavoriteBorderIcon
                  fontSize="small"
                  sx={{ fontSize: isLTE1000 && "15px" }}
                />
              }
              {productId.likes} veces indicado como favorito
            </Typography>
          </Box>

          <Box
            sx={{
              width: isLTE1200 ? "100%" : "80%",
              height: "100%",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: isLTE454
                  ? "30px"
                  : isLTE768
                  ? "35px"
                  : isLTE1000 && "45px",
                textTransform: "uppercase",
                letterSpacing: isLTE768
                  ? "0.5rem"
                  : isLTE1520
                  ? "1rem"
                  : "1.5rem",
                ml: isLTE454 ? "15px" : isLTE768 && "15px",
              }}
            >
              {productId?.title}
            </Typography>

            <Typography
              component="p"
              sx={{ ml: isLTE454 ? "25px" : "15px", my: "5px" }}
            >
              {productId?.category} para {productId?.gender}
            </Typography>

            <Typography variant="h4" mt={2.5} ml={2}>
              <ProductPrice price={productId?.price} style={priceStyle} />
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  width: "50%",
                  maxWidth: "13rem",
                  mt: isLTE1200 ? "1.5rem" : "5px",
                  borderRadius: "40px",
                  fontSize: isLTE454 ? "15px" : "18px",
                  mb: "10px",
                }}
              >
                COMPRAR
              </Button>
              <Button
                variant="contained"
                endIcon={<AddShoppingCartIcon />}
                sx={{
                  width: "60%",
                  maxWidth: "15rem",
                  height: "2.5rem",
                  borderRadius: "40px",
                  fontSize: isLTE454 ? "12px" : "13px",
                  mb: "30px",
                }}
                onClick={() => handleClickAdd(productId)}
              >
                Agregar al carrito
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          m: isLTE768 ? "0.5rem 0 1rem 0" : isLTE1400 && "4rem 0 1rem 0",
          display: "flex",
          justifyContent: isLTE1400 ? "center" : "end",
        }}
      >
        <Box
          sx={{
            width: isLTE768 ? "100%" : isLTE1400 ? "90%" : "50%",
            textAlign: "start",
          }}
        >
          <Typography
            component="p"
            sx={{
              fontSize: isLTE454 ? "14.8px" : "16px",
              width: isLTE768 ? "90%" : "80%",
              mx: "auto",
            }}
          >
            {productId?.description}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: isLTE1250 && "column",
          alignItems: isLTE1250 && "center",
        }}
      >
        <Box
          sx={{
            width: isLTE1250 ? "100%" : isLTE1520 ? "60%" : "55%",
            display: isLTE1250 && "flex",
            flexDirection: isLTE1250 && "column",
            alignItems: isLTE1250 && "center",
          }}
        >
          <Box
            sx={{ mx: "25px", mb: "50px", width: isLTE1200 ? "90%" : "100%" }}
          >
            <RelatedProducts
              id={id}
              products={products}
              category={category}
              gender={gender}
            />
          </Box>

          <Box
            sx={{
              width: isLTE768 ? "98%" : "90%",
              maxWidth: "60rem",
              display: "flex",
              justifyContent: "center",
              mt: "10px",
              maxHeight: "21.5rem",
              mb: "20px",
              border: "1px solid #F5F5F5",
              ml: isLTE1250 ? "" : "2rem",
              boxShadow: "10px 10px 15px #888888",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              {productId.Comments &&
                productId.Comments.length > 0 &&
                productId.Comments.some(
                  (comment) => comment.userId === userId
                ) &&
                productId.Comments.map((comment) => (
                  <Box key={comment.id} sx={{}}>
                    <Box
                      sx={{
                        overflow: "auto",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#f5f5f5",
                        backgroundImage: 'url("/logoblanco.svg")',
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      {comment.userId === userId && (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            height: "13rem",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignSelf: comment.userId
                                ? "flex-end"
                                : "flex-start",
                              bgcolor: "#00CCFD",
                              maxWidth: "75%",
                              width: isLTE768 ? "19rem" : "24rem",
                              borderRadius: "15px 15px 0px 15px",
                              mx: "5px",
                              padding: isLTE768 ? "5px" : "10px",
                              mt: isLTE600 ? "3px" : "5px",
                              border: "1px solid #00CCFD",
                              boxShadow: "10px 10px 15px #888888",
                              overflow: "break-word",
                              wordWrap: "break-word",
                              gap: 1,
                            }}
                          >
                            <Typography
                              component="p"
                              sx={{ fontSize: isLTE768 && "14px" }}
                            >
                              {comment.text}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            {comment.Answers &&
                              comment.Answers.length > 0 &&
                              comment.Answers.map((answer) => (
                                <Box
                                  key={answer.id}
                                  sx={{
                                    display: "flex",
                                    bgcolor:
                                      userId === answer.userId
                                        ? "#00CCFD"
                                        : "#F5F5F5",
                                    width: isLTE768 ? "19rem" : "24rem",
                                    maxWidth: "75%",

                                    borderRadius:
                                      userId === answer.userId
                                        ? "15px 15px 0px 15px"
                                        : "0 15px 15px 15px",
                                    mx: "5px",
                                    alignSelf:
                                      userId === answer.userId
                                        ? "flex-end"
                                        : "flex-start",
                                    flexDirection: "column",
                                    padding: isLTE768 ? "5px" : "10px",
                                    mt: isLTE600 ? "5px" : "5px",
                                    border: "1px solid #00CCFD",
                                    boxShadow: "10px 10px 15px #888888",
                                    overflow: "break-word",
                                    wordWrap: "break-word",
                                    gap: 1,
                                  }}
                                >
                                  <Typography
                                    component="p"
                                    sx={{ fontSize: isLTE768 && "14px" }}
                                  >
                                    {answer.answer}
                                  </Typography>
                                </Box>
                              ))}
                          </Box>
                        </Box>
                      )}
                    </Box>
                    <Box>
                      {userId === comment.userId && (
                        <AnswerComment commentId={comment.id} />
                      )}
                    </Box>
                  </Box>
                ))}
              {productId.Comments &&
                productId.Comments.length >= 0 &&
                productId.Comments.every(
                  (comment) => comment.userId !== userId
                ) && (
                  <Box
                    sx={{
                      textAlign: "start",
                      mx: isLTE768 ? "2px" : "20px",
                    }}
                  >
                    <Box
                      sx={{ overflow: "break-word", wordWrap: "break-word" }}
                    >
                      <Typography
                        component="p"
                        sx={{
                          m: "10px",
                          fontSize: isLTE768 ? "13.5px" : isLTE1520 && "15px",
                        }}
                      >
                        En CompraMás, valoramos tu retroalimentación. A través
                        de nuestra sección de comentarios, te invitamos a
                        compartir preguntas, opiniones y experiencias para
                        mejorar la experiencia de compra. Si tienes consultas
                        específicas sobre un producto o deseas compartir tus
                        impresiones, esta sección es ideal para hacerlo. Por
                        otro lado, si necesitas ayuda personalizada o resolver
                        dudas, nuestro equipo está a tu disposición a través de
                        WhatsApp. Ya sea para consultas sobre productos o
                        asesoramiento detallado, ¡gracias por ser parte de
                        CompraMás!
                      </Typography>
                    </Box>

                    <CommentProducts productId={productId.id} />
                  </Box>
                )}
            </Box>
          </Box>

          <Box
            sx={{
              width: isLTE600 ? "98%" : "90%",
              maxWidth: "60rem",
              display: "flex",
              ml: isLTE1200 ? "" : "2rem",
              justifyContent: isLTE1250 && "center",
            }}
          >
            <CommentDesplegable productId={productId} userId={userId} />
          </Box>
        </Box>
        <Box
          sx={{
            width: isLTE1250 ? "100%" : isLTE1520 ? "40%" : "45%",
            display: "flex",
            mb: "15px",
          }}
        >
          <CompleteOutfits
            IdProduct={IdProduct}
            gender={gender}
            category={category}
            products={products}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default DetailProduct;
