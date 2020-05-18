const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const sessionConfig = require("./sessionConfig");

// const sessionConfig = {
//   name: "monster",
//   secret: process.env.SESSION_SECRET || "keep it secret, keep it safe!",
//   resave: false,
//   saveUninitialized: process.env.SEND_COOKIES || true,
//   cookie: {
//     maxAge: 1000 * 60 * 10, // good for 10 mins in ms
//     secure: process.env.USE_SECURE_COOKIES || false, // used over https only, set to true in production
//     httpOnly: true, // true means JS on the client cannot access the cooke
//   },
// };
module.exports = (server) => {
  server.use(session(sessionConfig));
  server.use(morgan("dev"));
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
};
