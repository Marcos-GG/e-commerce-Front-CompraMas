const { Products, Like, User } = require("../../db");

const getProductController = async (id) => {
  if (id) {
    const idProduct = await Products.findByPk(id);

    return idProduct;
  }

  const allProducts = await Products.findAll({
    include: [
      { model: Like, include: { model: User, attributes: ["name", "id"] } },
    ],
  });

  return allProducts;
};

module.exports = getProductController;
