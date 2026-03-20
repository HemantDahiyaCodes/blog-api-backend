import {Router} from "express";
import * as signUpController from "../controllers/sign-up-controller.js";
import { validationRules } from "../validation/signup-validation.js";

// Creating a router
const signUp = Router();

signUp.post("/", validationRules, signUpController.handleSignUp);

export {signUp};