import { Router } from "express";
import * as postController from "../controllers/postController.js";
const posts = Router();


posts.get(
  "/",
  postController.allPosts
);

posts.get(
  "/:postId",
  postController.getPost
);

posts.post(
  "/:postId/comments",
  postController.postComment
);

posts.post(
  "/",
  postController.createPost
);

posts.delete(
  "/:postId/:commentId/",
  postController.deleteComment
);

export {posts}