import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../../Redux/actions";

function Home() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Hola SOY HOME loco vamos a sacar esto adelante daleeee</h1>
      <div>
        {products.map((product) => (
          <div key={product?.id}>
            <p>id : {product?.id}</p>
            <p>title: {product?.title}</p>
            <p>image: {product?.image}</p>
            <p>description:{product?.description}</p>
            <p>price: {product?.price}</p>
            <p>gender: {product?.gender}</p>
            <p>category: {product?.category}</p>
            <p>likes: {product?.likes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
