const getProductController = require("../../Controllers/Productos/getProduct");

const getProductHandler = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const idProduct = await getProductController(id);
      if (!idProduct) throw new Error("El producto no existe");

      return res.status(200).json(idProduct);
    }

    const allProducts = await getProductController();
    if (allProducts.length === 0) throw new Error("No existen productos");

    return res.status(200).json(allProducts);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = getProductHandler;
