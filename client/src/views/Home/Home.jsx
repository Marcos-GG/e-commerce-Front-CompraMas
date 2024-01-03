import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../../Redux/actions/productsActions";
import CardContainer from "../../components/CardContainer";
// import { persistor } from "../../Redux/store";

function Home() {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   const handlePersistingData = async () => {
  //     try {
  //       const purgeResult = await persistor.purge();
  //       ("Resultado de purgar datos persistidos:", purgeResult);
  //       const persistResult = await persistor.persist();
  //       ("Resultado de persistir datos:", persistResult);
  //       // Aquí puedes realizar cualquier otra lógica necesaria después de purgar y persistir los datos
  //     } catch (error) {
  //       console.error("Error al purgar o persistir datos:", error);
  //     }
  //   };

  //   handlePersistingData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div>
      <h1>home</h1>
      <CardContainer products={products} />
    </div>
  );
}

export default Home;
