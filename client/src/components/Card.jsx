/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../Redux/actions/ShoppingCartAction";

function Card({ product }) {
  const dispatch = useDispatch();

  const handleClickAdd = () => {
    dispatch(addProduct(product));
  };

  // const handleClickLike = () => {
  //   dispatch(addLike());
  // };

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
        <button onClick={() => handleClickAdd(product)}>
          Agregar
          {/* <NavLink to={"/carrito"}>Agregar</NavLink> */}
        </button>
      </div>
      {/* <div onClick={() => handleClickLike(product?.id)}>
        <button>Like</button>
      </div> */}
    </div>
  );
}

export default Card;
