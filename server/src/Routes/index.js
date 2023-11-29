const { Router } = require("express");
// Importacion de los handlers

/// handlers Users
const createUserHandler = require("../Handlers/Usuarios/postUser");
const getUserHandler = require("../Handlers/Usuarios/getUser");

// handlers Products
const postProductHandler = require("../Handlers/Productos/postProduct");

const router = Router();

// users
router.post("/users", createUserHandler);
router.get("/users", getUserHandler);
router.get("/users/:id", getUserHandler);

// products
router.post("/products", postProductHandler);

module.exports = router;
