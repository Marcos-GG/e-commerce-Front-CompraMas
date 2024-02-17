import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { putProduct, moveToActive } from "../Redux/actions/productsActions";

const DesactivatedProducts = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.desactivatedproducts);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(putProduct());
    }
  }, [dispatch, products]);

  const activateProduct = (id, product) => {
    const updateProduct = { ...product, status: true };
    dispatch(putProduct(id, updateProduct));
    dispatch(moveToActive(id));
  };

  return (
    <div>
      <h1>productos desactivados</h1>
      <div>
        <h3>Productos</h3>
        {products.map((product) => (
          <div key={product.id}>
            <p>{product?.image1}</p>
            <p>{product.title}</p>
            <p>{product.price}</p>
            {/* hay que dar funcionalidad botones para detalle del producto y para activar /eliminar publicacion */}
            <button>
              <NavLink to={`/detail/${product.id}`}>Ver mas</NavLink>
            </button>
            <button onClick={() => activateProduct(product.id, product)}>
              reactivar
            </button>
            <button>eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesactivatedProducts;
