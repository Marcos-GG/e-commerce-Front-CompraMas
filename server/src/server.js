const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const server = express();

server.use(cors());
server.use(morgan("dev"));

server.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});
server.post("/products", (req, res) => {
  res.send("creo");
});

module.exports = server;
