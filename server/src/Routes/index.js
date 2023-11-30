const { Router } = require("express");
// Importacion de los handlers

/// handlers Users
const createUserHandler = require("../Handlers/Usuarios/postUser");
const getUserHandler = require("../Handlers/Usuarios/getUser");

// handlers Products
const postProductHandler = require("../Handlers/Productos/postProduct");
const getProductHandler = require("../Handlers/Productos/getProduct");
const putProductHandler = require("../Handlers/Productos/putProduct");

// handlers likes
const postLikeHandler = require("../Handlers/Like/postLikeHandler");

const router = Router();

// users
router.post("/users", createUserHandler);
router.get("/users", getUserHandler);
router.get("/users/:id", getUserHandler);

// products
router.get("/products/:id", getProductHandler);
router.post("/products", postProductHandler);
router.get("/products", getProductHandler);
router.put("/products/:id", putProductHandler);

//likes
router.post("/likes", postLikeHandler);

module.exports = router;
