/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  addProduct,
  removeProduct,
} from "../../Redux/actions/ShoppingCartAction";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.shoppingCart.products);

  const handleClickAdd = (product) => {
    dispatch(addProduct(product));
  };

  const handleClickRemove = (product) => {
    dispatch(removeProduct(product));
  };

  const calcularValorTotal = () => {
    return products.reduce(
      (total, product) => total + product.price * product.cantidad,
      0
    );
  };

  useEffect(() => {
    if (products.length === 0) {
      navigate("/");
    }
  }, [products]);

  return (
    <>
      <h2>carrito de compras</h2>
      {products &&
        products.map((product) => (
          <div key={product.id}>
            <div>
              <p>{product?.image1}</p>
              <p>{product.price}</p>
              <p>{product.title}</p>
              <p>{product.cantidad}</p>
            </div>
            <div>
              <button onClick={() => handleClickAdd(product)}>Agregar</button>
              <button onClick={() => handleClickRemove(product)}>Quitar</button>
            </div>
          </div>
        ))}
      <p>Total: {calcularValorTotal()}</p>
    </>
  );
};

export default ShoppingCart;
