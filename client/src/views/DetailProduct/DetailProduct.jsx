import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductId } from "../../Redux/actions/productsActions";
import { useEffect } from "react";
import RelatedProducts from "../../components/RelatedProducts";
import CommetProducts from "../../components/CommentProducts";
import AnswerComment from "../../components/AnswerComment";

function DetailProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const productId = useSelector((state) => state.products.productId);
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("admin");

  useEffect(() => {
    dispatch(getProductId(id, token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
        </div>
        {productId.Comments && productId.Comments.length > 0 ? (
          <div style={{ backgroundColor: "green" }}>
            <h3>Comentarios:</h3>
            {productId.Comments.map((comment) => (
              <div key={comment.id}>
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
                {isAdmin && <AnswerComment commentId={comment.id} />}
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
        <RelatedProducts
          id={productId?.id}
          gender={productId?.gender}
          category={productId?.category}
        />
      </div>
    </>
  );
}

export default DetailProduct;
