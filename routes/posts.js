const posts = require("express").Router();
const passport_jwt = require("../auth/JWTStrategy");

posts.get(
  "/",
  passport_jwt.authenticate("jwt", { session: false }),
  (req, res) => {
    const user = req.user;

    if (!user) {
      return res.json({ message: "You dont have access to this route" });
    } else {
      return res.json({
        message: `Welcome ${user.username}, you have access to this route`,
      });
    }
  }
);

module.exports = posts;
