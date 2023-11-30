const { Products } = require("../../db");

const getProductController = async (id) => {
  if (id) {
    const idProduct = await Products.findByPk(id);

    return idProduct;
  }

  const allProducts = await Products.findAll();

  return allProducts;
};

module.exports = getProductController;
