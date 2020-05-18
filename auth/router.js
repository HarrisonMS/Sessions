const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/model.js");
const { isValid } = require("../users/validate");
const validateUserAvailability = require("../database/helpers/userMiddleware");

router.post("/register", validateUserAvailability, (req, res) => {
  const users = req.body;

  if (isValid(users)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    // hash the password
    const hash = bcrypt.hashSync(users.password, rounds);

    users.password = hash;

    // save the user to the database
    Users.add(users)
      .then((user) => {
        req.session.loggedIn === true;

        res.status(201).json({ data: user });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message:
        "please provide username and password and the password shoud be alphanumeric",
    });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ username: username })
      .then(([user]) => {
        console.log(user);
        // compare the password the hash stored in the database
        if (user && bcrypt.compareSync(password, user.password)) {
          // we can save information about the client inside the session (req.session)
          req.session.loggedIn = true;
          req.session.user = user;

          res.status(200).json({ message: "Welcome to our API" });
        } else {
          res.status(401).json({ message: "Invalid users" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message:
        "please provide username and password and the password shoud be alphanumeric",
    });
  }
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res
          .status(500)
          .json({ message: "we could not log you out, try later please" });
      } else {
        res.status(204).end();
      }
    });
  } else {
    res.status(204).end();
  }
});

module.exports = router;
