const login = require("express").Router();
const loginController = require("../controllers/log-in-controller");
const passport = require("../auth/localStrategy");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

login.get("/", loginController.loginForm);
login.post(
  "/",
  passport.authenticate(
    "local",
    {
      successRedirect: "/users/posts",
      failureRedirect: "/users/log-in",
    },
    { session: false }
  ),
  (req, res) => {
    const user = req.user;

    if (!user) {
      return "Authentication failed";
    }

    const token = jwt.sign({ user: user }, process.env.SECRET_KEY);
    res.json({ token });
  }
);

module.exports = login;
