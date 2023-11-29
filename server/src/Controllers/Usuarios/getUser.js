const { User } = require("../../db");

const getUserController = async (id) => {
  if (id) {
    const userId = await User.findByPk(id);

    return userId;
  }

  const allUsers = await User.findAll();
  if (allUsers.length === 0) throw new Error("No hay usuarios");

  return allUsers;
};

module.exports = getUserController;
