const router = require("express").Router();
const authRouter = require("../auth/router");
const usersRouter = require("../users/router");
const authenticator = require("../auth/authenticator");

router.use("/auth", authRouter);
router.use("/users", authenticator, usersRouter);

router.get("/", (req, res) => {
  res.json({ api: "You figured it out!" });
});

module.exports = router;
