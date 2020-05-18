const express = require("express");

const apiRouter = require("./router");
const serverConfig = require("./serverConfig");
const server = express();

serverConfig(server);
server.use("/api", apiRouter);

module.exports = server;
