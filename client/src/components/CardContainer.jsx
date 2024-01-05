/* eslint-disable react/prop-types */
import Card from "./Card";

function CardContainer({ products }) {
  return (
    <div>
      {products &&
        products.map((product) => (
          <div key={product?.id}>
            <Card product={product} />
          </div>
        ))}
    </div>
  );
}

export default CardContainer;
