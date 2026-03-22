import { Router } from "express";
import * as postController from "../controllers/postController.js";
import { createComment } from "../controllers/commentController.js";
import passport from "passport";
import "../auth/JWTStrategy.js"

const posts = Router();

posts.get("/", postController.allPosts);

posts.get("/:postId", postController.getPost);

posts.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postController.createPost,
);

posts.use("/:postId/comments", createComment);

export { posts };