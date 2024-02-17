const { Products, Like, User, Comment, Answer, Image } = require("../../db");

const getProductController = async (id) => {
  if (id) {
    const idProduct = await Products.findByPk(id, {
      include: [
        {
          model: Image,
        },
        {
          model: Like,
          include: { model: User, attributes: ["name", "lastname"] },
        },
        {
          model: Comment,
          include: [
            { model: User, attributes: ["name", "lastname", "admin"] },
            {
              model: Answer,
              include: {
                model: User,
                attributes: ["name", "lastname", "admin"],
              },
            },
          ],
        },
      ],
    });

    return idProduct;
  }

  const allProducts = await Products.findAll({
    include: [
      {
        model: Image,
      },
      {
        model: Like,
        include: { model: User, attributes: ["name", "lastname"] },
      },
      {
        model: Comment,
        include: [
          { model: User, attributes: ["name", "lastname", "admin"] },
          {
            model: Answer,
            include: { model: User, attributes: ["name", "lastname", "admin"] },
          },
        ],
      },
    ],
  });

  return allProducts;
};

module.exports = getProductController;
