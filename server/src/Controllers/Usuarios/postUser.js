const { User } = require("../../db");
const { Op } = require("sequelize");

const createUserController = async (userData) => {
  const checkUserExist = await User.findOne({
    where: {
      [Op.or]: [{ email: userData.email }, { DNI: userData.DNI }],
    },
  });

  if (checkUserExist) throw new Error("El usuario ya existe");

  const newUser = await User.create(userData);

  return newUser;
};

module.exports = createUserController;
