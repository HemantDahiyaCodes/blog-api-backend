const signUp = require("express").Router();
const signUpController = require("../controllers/sign-up-controller");

signUp.get("/", signUpController.signUpForm);
signUp.post("/", signUpController.handleSignUp);


module.exports = signUp;