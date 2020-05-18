const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const sessions = require("express-session");
const sessionConfig = require("./sessionConfig");

module.exports = (server) => {
  server.use(sessions(sessionConfig));
  server.use(morgan("dev"));
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
};
