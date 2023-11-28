const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Comment",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },

      text: {
        type: DataTypes.VARCHAR(255),
        allowNull: false,
        validate: {
          len: {
            args: [5, 1000],
            msg: "Debe tener entre 10 y 300 caracteres",
          },
        },
      },
    },
    { timestamps: true }
  );
};
