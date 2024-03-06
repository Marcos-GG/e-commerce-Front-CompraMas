/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../Redux/actions/ShoppingCartAction";
import { addLike, removeLike } from "../Redux/actions/Likes";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ProductItem from "./ProductItem";

function Card({ product }) {
  const dispatch = useDispatch();

  const [liked, setLiked] = useState(false);

  const token = localStorage.getItem("token");
  const decodeToken = jwtDecode(token);
  const userId = decodeToken.id;

  useEffect(() => {
    const productosLikeados = product.Likes?.some(
      // Likes es un array de objetos que son los usuarios que le dieron like , si "alguno" de esos objetos es del userId devuelve true
      (like) => like.userId === userId
    );

    setLiked(productosLikeados); // cargamos con true o false dependieno lo que devuelva some
  }, [product, userId]);

  // useEffect(() => {
  // }, []);

  const handleClickAdd = () => {
    dispatch(addProduct(product));
  };

  const handleClickLike = () => {
    if (!liked) {
      dispatch(addLike(product?.id));

      setLiked(true);
    } else {
      dispatch(removeLike(product?.id));
      setLiked(false);
    }
  };

  const navigate = useNavigate();

  return (
    <ProductItem
      product={product}
      handleClickAdd={handleClickAdd}
      handleClickLike={handleClickLike}
      liked={liked}
      navigate={navigate}
    />
  );
}

export default Card;
