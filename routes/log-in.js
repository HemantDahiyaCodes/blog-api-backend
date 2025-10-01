const login = require("express").Router();
const loginController = require("../controllers/log-in-controller");
const passport = require("../auth/localStrategy");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

// login.get("/", loginController.loginForm);
login.post(
  "/",
  passport.authenticate("local", { session: false }), (req, res) => {
    const user = req.user;

    if(!user) {
        return res.json({message: "Username or password is incorrect"});
    }

    const token = jwt.sign({user: user}, process.env.SECRET_KEY, {expiresIn: "1hr"});
    res.json({token, success: true});
  }
);

module.exports = login;