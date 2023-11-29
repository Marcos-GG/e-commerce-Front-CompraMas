const postProductController = require("../../Controllers/Productos/postProduct");

const postProductHandler = async (req, res) => {
  try {
    const { title, image, description, price, gender, category } = req.body;

    if (!title || !image || !description || !price || !gender || !category)
      throw new Error("Datos incompletos para realizar publicacion");

    const postProduct = await postProductController({
      title,
      image,
      description,
      price,
      gender,
      category,
    });

    if (!postProduct) throw new Error("No se pudo crear la publicacion");

    return res.status(200).json(postProduct);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = postProductHandler;
