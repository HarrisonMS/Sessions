const Users = require("../../users/model");

function validateUserAvailability(req, res, next) {
  const username = req.body.username;

  Users.findBy({ username })
    .then((username) => {
      console.log("idk", username);
      if (username) {
        res.status(400).json({ message: "username already taken" });
      } else {
        next();
      }
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ success: false, error });
    });
}

module.exports = validateUserAvailability;
