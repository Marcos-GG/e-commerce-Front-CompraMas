const { Router } = require("express");
// Importacion de los handlers

/// handlers Users
const createUserHandler = require("../Handlers/Usuarios/postUser");
const getUserHandler = require("../Handlers/Usuarios/getUser");

// handlers Products
const postProductHandler = require("../Handlers/Productos/postProduct");

// handlers likes
const postLikeHandler = require("../Handlers/Like/postLikeHandler");

const router = Router();

// users
router.post("/users", createUserHandler);
router.get("/users", getUserHandler);
router.get("/users/:id", getUserHandler);

// products
router.post("/products", postProductHandler);

//likes
router.post("/likes", postLikeHandler);

module.exports = router;
