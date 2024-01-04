/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

function RelatedProducts({ limitedFilteredProducts }) {
  return (
    <>
      <h3>Productos relacionados:</h3>
      <div>
        {Array.isArray(limitedFilteredProducts) &&
          limitedFilteredProducts.map((product) => (
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
