const posts = require("express").Router();
const passport_jwt = require("../auth/JWTStrategy");
const postController = require("../controllers/postController");

posts.get(
  "/",
  passport_jwt.authenticate("jwt", { session: false }), postController.allPosts
);

posts.get("/:postId", passport_jwt.authenticate("jwt", {session: false}), postController.getPost)

posts.post("/:postId/comment", passport_jwt.authenticate("jwt", {session: false}), postController.postComment);

posts.post("/post/create", passport_jwt.authenticate("jwt", {session: false}), postController.createPost);

module.exports = posts;
