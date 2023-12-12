import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function RelatedProducts({ gender, category, id }) {
  const products = useSelector((state) => state.products.products);

  const filterProducts = products.filter((product) => {
    return product
      ? product.id !== id &&
          product.category === category &&
          product.gender === gender
      : product.gender === gender;
  });

  const limitedFilteredProducts = filterProducts.slice(0, 5);

  return (
    <>
      <h3>Productos relacionados:</h3>
      <div>
        {limitedFilteredProducts.map((product) => (
          <div key={product.id}>
            <NavLink to={`/detail/${product.id}`}>
              <p>{product?.image}</p>
              <p>{product?.price}</p>
              <button>Ver producto</button>
            </NavLink>
          </div>
        ))}
      </div>
    </>
  );
}

export default RelatedProducts;
