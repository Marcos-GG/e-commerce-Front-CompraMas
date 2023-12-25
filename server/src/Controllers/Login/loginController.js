const { User } = require("../../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const loginController = async (email, password) => {
  const user = await User.findOne({
    where: { email: email, password: password },
  });

  if (!user) throw new Error("El usuario no esta registrado.");

  // comparamos las contraseñas para ver si es valido/correcta y esta en la base de datos
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) throw new Error("contraseña incorrecta.");

  //si es valido generamos token JWT
  const token = jwt.sign(user, "secretKey", {
    expiresIn: "2h",
  });

  return token;
};

module.exports = loginController;
