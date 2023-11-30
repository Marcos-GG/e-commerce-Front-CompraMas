const { Router } = require("express");
// Importacion de los handlers

/// handlers Users
const createUserHandler = require("../Handlers/Usuarios/postUser");
const getUserHandler = require("../Handlers/Usuarios/getUser");
const putUserHandler = require("../Handlers/Usuarios/putUser");
const deleteUserHandler = require("../Handlers/Usuarios/deleteUsers");

// handlers Products
const postProductHandler = require("../Handlers/Productos/postProduct");
const getProductHandler = require("../Handlers/Productos/getProduct");
const putProductHandler = require("../Handlers/Productos/putProduct");
const deleteProductHandler = require("../Handlers/Productos/deleteProduct");

// handlers likes
const postLikeHandler = require("../Handlers/Like/postLikeHandler");
const removeLikeHandler = require("../Handlers/Like/removeLikeHandler");

const router = Router();

// users
router.get("/users/:id", getUserHandler);
router.post("/users", createUserHandler);
router.delete("/users/:id", deleteUserHandler);
router.get("/users", getUserHandler);
router.put("/users/:id", putUserHandler);

// products
router.get("/products/:id", getProductHandler);
router.post("/products", postProductHandler);
router.get("/products", getProductHandler);
router.put("/products/:id", putProductHandler);
router.delete("/products/:id", deleteProductHandler);

//likes
router.post("/likes", postLikeHandler);
router.put("/likes", removeLikeHandler);

module.exports = router;
