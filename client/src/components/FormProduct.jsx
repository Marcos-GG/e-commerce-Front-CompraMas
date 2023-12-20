import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../Redux/actions/productsActions";

const FormProduct = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: "",
    image: "",
    description: "",
    stock: "",
    price: "",
    gender: "",
    category: "",
  });

  const formHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    dispatch(createProduct(form));
  };

  return (
    <>
      <h1> Formulario de creacion para los productos</h1>
      <div>
        <form onSubmit={handlerSubmit}>
          <div>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={formHandler}
              placeholder="Título"
            />
          </div>
          <div>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={formHandler}
              placeholder="URL de la imagen"
            />
          </div>
          <textarea
            name="description"
            value={form.description}
            onChange={formHandler}
            placeholder="Descripción"
          ></textarea>
          <div>
            <input
              type="text"
              name="stock"
              value={form.stock}
              onChange={formHandler}
              placeholder="Stock"
            />
          </div>
          <input
            type="text"
            name="price"
            value={form.price}
            onChange={formHandler}
            placeholder="Precio"
          />
          <div>
            <input
              type="text"
              name="gender"
              value={form.gender}
              onChange={formHandler}
              placeholder="Género"
            />
          </div>
          <div>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={formHandler}
              placeholder="Categoría"
            />
          </div>
          <button type="submit">Crear</button>
        </form>
      </div>
    </>
  );
};

export default FormProduct;
