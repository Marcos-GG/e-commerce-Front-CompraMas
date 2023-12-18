import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../Redux/actions/productsActions";

const ProductsAdmin = () => {
  const products = useSelector((state) => state.products.products);
  console.log(products, "productos en admin");
  const dispatch = useDispatch();

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div>
      <h1>aca se ven los productos y se los desactiva</h1>
      <div>
        <h3>Productos</h3>
        {products.map((product) => (
          <div key={product.id}>
            <p>{product.image}</p>
            <p>{product.title}</p>
            <p>{product.price}</p>
            {/* hay que dar funcionalidad botones para detalle del producto y para suspender/desactivar/eliminar publicacion */}
            <button>Detalle</button>
            <button>suspender</button>
            <button>eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsAdmin;
