import { useNavigate } from "react-router-dom";
import ProductItem from "./ProductItem";
import { addProduct } from "../Redux/actions/ShoppingCartAction";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { removeLike } from "../Redux/actions/Likes";
import { useEffect } from "react";

const Favoritos = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const decodeToken = jwtDecode(token);
  const userId = decodeToken.id;

  const favoriteProducts = useSelector((state) => state.products.favoritos);

  useEffect(() => {
    if (favoriteProducts.length === 0) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoriteProducts]);

  const liked = favoriteProducts.some(
    (product) =>
      product.Likes && product.Likes.some((like) => like.userId === userId)
  );

  console.log(favoriteProducts, "como llega a favoritos");

  const handleClickAdd = (product) => {
    dispatch(addProduct(product));
  };

  const handleClickLike = (productId) => {
    // por el momento no entiendo bien porque aca llega el id del producto
    console.log(productId, "estamos en click");

    if (productId) dispatch(removeLike(productId));
  };

  return (
    <div>
      {favoriteProducts.map((product) => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            handleClickAdd={handleClickAdd}
            handleClickLike={handleClickLike}
            liked={liked} // Establece el estado "liked" específico para este producto
            navigate={navigate}
          />
        );
      })}
    </div>
  );
};

export default Favoritos;
