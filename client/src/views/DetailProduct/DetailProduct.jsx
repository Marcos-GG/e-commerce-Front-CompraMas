import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductId } from "../../Redux/actions/productsActions";
import { useEffect } from "react";
import RelatedProducts from "../../components/RelatedProducts";
import CommetProducts from "../../components/CommentProducts";
import AnswerComment from "../../components/AnswerComment";
import { addProduct } from "../../Redux/actions/ShoppingCartAction";
import { jwtDecode } from "jwt-decode";

function DetailProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const productId = useSelector((state) => state.products.productId);
  const products = useSelector((state) => state.products.products);

  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("admin");

  const decodeToken = jwtDecode(token);
  const userId = decodeToken.id;

  useEffect(() => {
    dispatch(getProductId(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // productos relacionados :
  const category = productId?.category;
  const gender = productId?.gender;

  const filterProducts = products.filter((product) => {
    return product
      ? product.id !== id &&
          product.category === category &&
          product.gender === gender
      : product.gender === gender && product.id !== id;
  });

  const handleClickAdd = (product) => {
    dispatch(addProduct(product));
  };

  const limitedFilteredProducts = filterProducts.slice(0, 5);

  return (
    <>
      <h2>Hola soy detail del producto</h2>
      <div>
        <div key={productId?.id}>
          <p>id : {productId?.id}</p>
          <p>title: {productId?.title}</p>
          <p>image: {productId?.image}</p>
          <p>description:{productId?.description}</p>
          <p>price: {productId?.price}</p>
          <p>gender: {productId?.gender}</p>
          <p>category: {productId?.category}</p>
          <p>likes: {productId?.likes}</p>

          <div>
            <button onClick={() => handleClickAdd(productId)}>Agregar</button>
          </div>
        </div>
        {productId.Comments && productId.Comments.length > 0 ? (
          <div style={{ backgroundColor: "green" }}>
            <h3>Comentarios:</h3>

            {productId.Comments.map((comment) => (
              <div key={comment.id}>
                <div
                  style={{
                    margin: "10px",
                    backgroundColor: "aqua",
                    border: "solid 2px",
                  }}
                >
                  <p>{comment.text}</p>

                  <div style={{ backgroundColor: "yellow" }}>
                    <p>Respuestas:</p>
                    {comment.Answers && comment.Answers.length > 0 ? (
                      comment.Answers.map((answer) => (
                        <div key={answer.id}>
                          <p>{answer.answer}</p>
                          <p>
                            Respondido por: {answer.User.name}{" "}
                            {answer.User.lastname}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p>No hay respuestas para este comentario.</p>
                    )}
                  </div>
                  {(isAdmin || userId === comment.userId) && (
                    <AnswerComment commentId={comment.id} />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay comentarios para este producto.</p>
        )}
      </div>
      <div>
        <h3>generar comentario</h3>
        <CommetProducts productId={productId?.id} />
      </div>
      <div>
        {limitedFilteredProducts.length > 0 && (
          <RelatedProducts limitedFilteredProducts={limitedFilteredProducts} />
        )}
      </div>
    </>
  );
}

export default DetailProduct;
