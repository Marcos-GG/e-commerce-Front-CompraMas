const { Products } = require("../../db");

const putProductController = async (id, productData) => {
  const product = await Products.findByPk(id);

  if (!product) throw new Error("Producto no encontrado");

  product.title = productData.title;
  product.description = productData.description;
  product.price = productData.price;
  product.image1 = productData.image1;
  product.image2 = productData.image2;
  product.image3 = productData.image3;
  product.image4 = productData.image4;
  product.gender = productData.gender;
  product.category = productData.category;
  product.status = productData.status;

  await product.save();

  return product;
};

module.exports = putProductController;
