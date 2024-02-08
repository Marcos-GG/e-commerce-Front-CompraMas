import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductId, getProducts } from "../../Redux/actions/productsActions";
import { useEffect } from "react";
import RelatedProducts from "../../components/RelatedProducts";
import CommetProducts from "../../components/CommentProducts";
import AnswerComment from "../../components/AnswerComment";
import { addProduct } from "../../Redux/actions/ShoppingCartAction";
import { jwtDecode } from "jwt-decode";
import { Box, Button, Typography } from "@mui/material";
import ProductPrice from "../../components/ProductPrice";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function DetailProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const productId = useSelector((state) => state.products.productId);
  const products = useSelector((state) => state.products.products);

  /// productos relacionados
  const category = productId?.category;
  const gender = productId?.gender;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch, id]);

  ///////
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("admin");

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
    fontSize: "2.2rem",
  };

  return (
    <Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center", // Alinea horizontalmente al centro
            mx: "5rem",
            mt: "3rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "240rem",
              flexDirection: "column",
              height: "",
              justifyContent: "center", // Alinea horizontalmente al centro
              alignItems: "center",
            }}
          >
            {/* <Box sx={{ alignSelf: "flex-start" }}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Josefin Sans, sans-serif",
                  fontStyle: "italic",
                  transform: "skewX(-15deg)",
                  textTransform: "uppercase",
                }}
              >
                {productId?.category}
              </Typography>
            </Box> */}
            <img
              src={productId.image}
              alt={productId.title}
              style={{ width: "430px", borderRadius: "5px" }} // Estilos directos a la imagen
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
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
                    fontSize: "13px",
                    fontWeight: "bold",
                    color: "gray",
                    fontStyle: "italic",
                  }}
                >
                  {<FavoriteBorderIcon fontSize="small" />}
                  {productId.likes} veces indicado como favorito
                </Typography>{" "}
              </Box>

              <Box sx={{ width: "80%", height: "100%" }}>
                <Typography
                  variant="h2"
                  sx={{ textTransform: "uppercase", letterSpacing: "0.2em" }}
                >
                  {productId?.title}
                </Typography>

                <Typography component="p" sx={{ ml: "15px", my: "5px" }}>
                  {productId?.category} para {productId?.gender}
                </Typography>

                <Typography variant="h4" mt={2.5}>
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
                      width: "12rem",
                      mt: "5px",
                      borderRadius: "40px",
                      fontSize: "18px",
                      mb: "10px",
                    }}
                  >
                    COMPRAR
                  </Button>
                  <Button
                    variant="contained"
                    endIcon={<AddShoppingCartIcon />}
                    sx={{
                      width: "13rem",
                      height: "2.5rem",
                      borderRadius: "40px",
                      fontSize: "13px",
                      mb: "30px",
                    }}
                    onClick={() => handleClickAdd(productId)}
                  >
                    Agregar al carrito
                  </Button>
                </Box>
              </Box>
            </Box>

            <Box>
              <Typography
                component="p"
                sx={{ fontSize: "16px", width: "75%", mx: "auto" }}
              >
                {productId?.description}
              </Typography>
            </Box>
          </Box>
        </Box>

        {productId.Comments && productId.Comments.length > 0 ? (
          <Box style={{ backgroundColor: "green" }}>
            <h3>Comentarios:</h3>

            {productId.Comments.map((comment) => (
              <Box key={comment.id}>
                <Box
                  style={{
                    margin: "10px",
                    backgroundColor: "aqua",
                    border: "solid 2px",
                  }}
                >
                  <p>{comment.text}</p>

                  <Box style={{ backgroundColor: "yellow" }}>
                    <p>Respuestas:</p>
                    {comment.Answers && comment.Answers.length > 0 ? (
                      comment.Answers.map((answer) => (
                        <div key={answer.id}>
                          <p>{answer.answer}</p>
                          <p>
                            Respondido por: {answer.User?.name}{" "}
                            {answer.User?.lastname}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p>No hay respuestas para este comentario.</p>
                    )}
                  </Box>
                  {(isAdmin || userId === comment.userId) && (
                    <AnswerComment commentId={comment.id} />
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <p>No hay comentarios para este producto.</p>
        )}
      </Box>
      <Box>
        <h3>generar comentario</h3>
        <CommetProducts productId={productId?.id} />
      </Box>
      <Box>
        <RelatedProducts
          id={id}
          products={products}
          category={category}
          gender={gender}
        />
      </Box>
    </Box>
  );
}

export default DetailProduct;
