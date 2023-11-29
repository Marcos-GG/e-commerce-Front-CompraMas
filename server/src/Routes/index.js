const { Router } = require("express");
// Importacion de los handlers

/// handlers Users
const createUserHandler = require("../Handlers/Usuarios/postUser");

const router = Router();

// users
router.post("/users", createUserHandler);

module.exports = router;
