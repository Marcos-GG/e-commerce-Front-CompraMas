import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const DesactivatedProducts = () => {
  const products = useSelector((state) => state.products.desactivatedproducts);
  console.log(products, "productos desactivados componente");

  useEffect(() => {
    console.log("El estado de productos desactivados ha cambiado:", products);
  }, [products]);

  return (
    <div>
      <h1>productos desactivados</h1>
      <div>
        <h3>Productos</h3>
        {products.map((product) => (
          <div key={product.id}>
            <p>{product.image}</p>
            <p>{product.title}</p>
            <p>{product.price}</p>
            {/* hay que dar funcionalidad botones para detalle del producto y para activar /eliminar publicacion */}
            <button>
              <NavLink to={`/detail/${product.id}`}>Ver mas</NavLink>
            </button>
            <button>reacivar</button>
            <button>eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesactivatedProducts;
