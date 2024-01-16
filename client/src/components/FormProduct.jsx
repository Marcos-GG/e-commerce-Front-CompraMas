/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../Redux/actions/productsActions";
import { getCategory, getGender } from "../Redux/actions/CategoryGender";

const FormProduct = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoryGender.category);
  const genders = useSelector((state) => state.categoryGender.gender);

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getGender());
  }, [getCategory, getGender]);

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
    <div>
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
            <select
              type="text"
              name="gender"
              value={form.gender}
              onChange={formHandler}
              placeholder="Género"
            >
              <option value="">Genero</option>
              {genders &&
                genders.map((gender) => (
                  <option key={gender.id} value={gender.gender}>
                    {gender.gender}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <select
              name="category"
              value={form.category}
              onChange={formHandler}
              placeholder="Categoría"
            >
              <option value="">Categoria</option>
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <button type="submit">Crear</button>
        </form>
      </div>
    </div>
  );
};

export default FormProduct;
