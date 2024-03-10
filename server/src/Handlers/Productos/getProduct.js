const getProductController = require("../../Controllers/Productos/getProduct");

const getProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { search, page } = req.query;

    if (id) {
      const idProduct = await getProductController(id, search);
      if (!idProduct) throw new Error("El producto no existe.");

      return res.status(200).json(idProduct);
    }

    if (search) {
      const searchProducts = await getProductController(id, search, page);
      if (!searchProducts)
        throw new Error(
          "No se encontraron productos con la información ingresada."
        );

      return res.status(200).json(searchProducts);
    }

    const allProducts = await getProductController();
    if (allProducts.length === 0) throw new Error("No existen productos.");

    return res.status(200).json(allProducts);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = getProductHandler;
