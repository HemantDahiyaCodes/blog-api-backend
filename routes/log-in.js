import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "../auth/passportConfig.js";

const login = Router();

login.post("/", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res
        .status(401)
        .json({
          success: false,
          message: info.message || "Username or password is incorrect",
        });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1hr",
    });

    return res.json({ token, user });
  })(req, res, next);
});
export { login };
