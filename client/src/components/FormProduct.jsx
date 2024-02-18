/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../Redux/actions/productsActions";
import { getCategory, getGender } from "../Redux/actions/CategoryGender";

const FormProduct = () => {
  // const [additionalImages, setAdditionalImages] = useState([]);

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoryGender.category);
  const genders = useSelector((state) => state.categoryGender.gender);

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getGender());
  }, [getCategory, getGender]);

  const [form, setForm] = useState({
    title: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
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

  // const addImageInput = () => {
  //   setAdditionalImages([...additionalImages, ""]);
  // };

  const handlerSubmit = (event) => {
    event.preventDefault();
    // const formData = {
    //   ...form,
    //   image: additionalImages, // Incluir todas las imágenes, incluida la imagen principal, en el array "image"
    // };
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
              name="image1"
              value={form.image1}
              onChange={formHandler}
              placeholder="imagen Principal"
            />
            {/* <input
            type="text"
            name="image"
            value={additionalImages[0]} // El primer input se utiliza como la imagen principal
            onChange={(event) => {
              const newImages = [...additionalImages];
              newImages[0] = event.target.value; // Actualizar el valor del primer input
              setAdditionalImages(newImages);
            }}
            placeholder="URL de la imagen principal"
          />
          <div>
            {additionalImages.slice(1).map(
              (
                image,
                index // Recorrer los inputs adicionales a partir del segundo elemento
              ) => (
                <div key={index}>
                  <input
                    type="text"
                    value={image}
                    onChange={(event) => {
                      const newImages = [...additionalImages];
                      newImages[index + 1] = event.target.value; // Index + 1 para evitar el primer input
                      setAdditionalImages(newImages);
                    }}
                    placeholder={`URL de la imagen ${index + 2}`}
                  />
                </div>
              )
            )}
            <button type="button" onClick={addImageInput}>
              Agregar más imágenes
            </button> */}
          </div>
          <div>
            <input
              type="text"
              name="image2"
              value={form.image2}
              onChange={formHandler}
              placeholder="segunda imagen"
            />
          </div>
          <div>
            <input
              type="text"
              name="image3"
              value={form.image3}
              onChange={formHandler}
              placeholder="tercera imagen"
            />
          </div>
          <div>
            <input
              type="text"
              name="image4"
              value={form.image4}
              onChange={formHandler}
              placeholder="ultima imagen"
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
