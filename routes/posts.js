const posts = require("express").Router();
const passport_jwt = require("../auth/JWTStrategy");
const postController = require("../controllers/postController");

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

posts.get("/:postId", passport_jwt.authenticate("jwt", {session: false}), postController.getPost)

posts.post("/:postId", passport_jwt.authenticate("jwt", {session: false}), postController.postComment);

module.exports = posts;
