/* eslint-disable react/prop-types */

import Card from "./Card";

function CardContainer({ products }) {
  return (
    <>
      <div>
        {products.map((product) => (
          <div key={product?.id}>
            <Card
              id={product?.id}
              title={product?.title}
              image={product?.image}
              price={product?.price}
              gender={product?.gender}
              category={product?.category}
              likes={product?.likes}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default CardContainer;
