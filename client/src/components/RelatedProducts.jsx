/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getProductId } from "../Redux/actions/productsActions";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

function RelatedProducts({ products, category, gender }) {
  const { id } = useParams();
  console.log(id, "id");
  console.log(products, "products");
  console.log(category, "category");
  console.log(gender, "gender");

  const dispatch = useDispatch();

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Filtrar directamente en el useEffect
    const newFilteredProducts = products
      .filter((product) => {
        return (
          product.id != id && // Excluir el producto actual
          product.category === category &&
          product.gender === gender
        );
      })
      .slice(0, 5);

    // Actualizar el estado
    setFilteredProducts(newFilteredProducts);
  }, [id, products, category, gender]);

  const handleProductClick = (productId) => {
    dispatch(getProductId(productId));
  };

  return (
    <Box>
      <h3>Productos relacionados:</h3>
      <div>
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <NavLink to={`/detail/${product.id}`}>
              <img src={product?.image} style={{ width: "150px" }}></img>
              <p>{product?.price}</p>
              <button onClick={() => handleProductClick(product.id)}>
                Ver producto
              </button>
            </NavLink>
          </div>
        ))}
      </div>
    </Box>
  );
}

export default RelatedProducts;
