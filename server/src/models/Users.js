const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      passwordConfirmation: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isConfirmed(value) {
            if (this.password !== value) {
              throw new Error("La contraseña y la confirmación no coinciden");
            }
          },
        },
      },

      // Numero de documento de identidad del usuario con el atributo que debe ser unico.
      DNI: {
        type: DataTypes.INTEGER,
        unique: true,
        validate: {
          isInt: true,
        },
      },

      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
