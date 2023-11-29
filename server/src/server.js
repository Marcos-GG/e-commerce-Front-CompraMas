const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./Routes/index");

const server = express();

server.use(cors());
server.use(morgan("dev"));
server.use(express.json());

server.use("/", routes);

module.exports = server;
