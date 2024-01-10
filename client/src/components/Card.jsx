/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../Redux/actions/ShoppingCartAction";
import { addLike, removeLike } from "../Redux/actions/Likes";
import { useState } from "react";

function Card({ product }) {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);

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

  return (
    <div style={{ border: "solid 1px", margin: "10px" }}>
      <p>title: {product?.title}</p>
      <p>image: {product?.image}</p>
      <p>price: {product?.price}</p>
      <p>gender: {product?.gender}</p>
      <p>category: {product?.category}</p>
      <p>likes: {product?.likes}</p>

      <button>
        <NavLink to={`/detail/${product?.id}`}>Ver mas</NavLink>
      </button>
      <div>
        <button onClick={() => handleClickAdd(product)}>Agregar</button>
      </div>
      <div onClick={() => handleClickLike(product?.id)}>
        <button>{liked ? "Dislike" : "Like"}</button>
      </div>
    </div>
  );
}

export default Card;
