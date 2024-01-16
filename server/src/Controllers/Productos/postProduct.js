const { Products, Gender, Category } = require("../../db");
const { Op } = require("sequelize");

const postProdcutController = async (data) => {
  const checkProductExist = await Products.findOne({
    where: {
      [Op.and]: [{ title: data.title }, { price: data.price }],
    },
  });

  if (checkProductExist) throw new Error("El producto ya existe");

  // Obtener el nombre del género y la categoría usando sus IDs
  // const gender = await Gender.findByPk(data.gender);
  // const category = await Category.findByPk(data.category);

  // data.gender = gender.gender;
  // data.category = category.name;

  const newProduct = await Products.create(data);

  return newProduct;
};

module.exports = postProdcutController;
