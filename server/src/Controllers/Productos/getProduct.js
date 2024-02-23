const { Op } = require("sequelize");
const { Products, Like, User, Comment, Answer } = require("../../db");

const getProductController = async (id, search) => {
  if (id) {
    const idProduct = await Products.findByPk(id, {
      include: [
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

  // separamos el valor de search
  const searchTerms = search ? search.split(" ") : [];
  const stopWords = [
    "del",
    "de",
    "el",
    "ella",
    "desde",
    "como",
    "pero",
    "la",
    "otro",
    "ellos",
    "ellas",
    "esos",
    "cómo",
    "donde",
    "e",
    "y",
    "a",
    "por",
    "que",
    "su",
    "se",
    "un",
    "una",
    "son",
    "tienen",
    "tienen",
    "tu",
    "tus",
    "unos",
  ];

  const filterSearchTerms = searchTerms.filter(
    (term) => !stopWords.includes(term.toLowerCase())
  );

  const palabras = filterSearchTerms.map((term) => ({
    [Op.or]: [
      {
        title: {
          [Op.like]: `%${term}%`,
        },
      },
      {
        description: {
          [Op.like]: `%${term}%`,
        },
      },
    ],
  }));

  // Op.and es el operador que permite combinar esas condiciones para formar una sola condición lógica. todas tienen que ser true ( en este caso las condiciones de palabras )

  if (search) {
    const products = await Products.findAll({
      where: {
        [Op.and]: palabras,
      },
    });

    return products;
  }

  const allProducts = await Products.findAll({
    include: [
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
