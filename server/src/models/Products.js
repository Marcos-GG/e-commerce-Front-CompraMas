const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Products",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isString: (value) => {
            if (typeof value !== "string") {
              throw new Error("El titulo debe contener texto válido"); //!
            }
          },
        },
      },

      image: {
        type: DataTypes.STRING,
        allowNull: true, // despues tiene que estar si o si en false
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [20, 1000], // Longitud entre 20 y 1000 caracteres
        },
      },

      price: {
        // precio
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      stock: {
        type: DataTypes.INTEGER,
      },

      gender: {
        // genero
        type: DataTypes.STRING,
        allowNull: false,
      },

      category: {
        // categorias
        type: DataTypes.STRING,
        allowNull: false,
      },

      likes: {
        //like / fav
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          isInt: true,
          min: 0,
        },
      },

      status: {
        // Estado de la publicación (puede ser nulo)
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
