const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Gender",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
