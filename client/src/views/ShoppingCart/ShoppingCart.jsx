import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  addProduct,
  removeProduct,
} from "../../Redux/actions/ShoppingCartAction";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.shoppingCart.products);
  console.log(products, "lo que hay en el carrito");

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

  useEffect(() => {}, [products]);

  return (
    <>
      <h2>carrito de compras</h2>
      {products &&
        products.map((product) => (
          <div key={product.id}>
            <div>
              <p>{product.image}</p>
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
