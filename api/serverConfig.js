const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const sessionConfig = require("./sessionConfig");

module.exports = (server) => {
  server.use(session(sessionConfig));
  server.use(morgan("dev"));
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
};
