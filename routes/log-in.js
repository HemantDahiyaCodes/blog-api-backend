import { Router} from "express";
import { default as passport } from "../auth/localStrategy.js";
import * as jwt from "jsonwebtoken";

const login = Router();

login.post(
  "/",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const user = req.user;

    if (!user) {
      return res.json({ message: "Username or password is incorrect" });
    }

    const token = jwt.sign({ user: user }, process.env.SECRET_KEY, {
      expiresIn: "1hr",
    });
    res.json({ token, success: true });
  },
);

export {login};