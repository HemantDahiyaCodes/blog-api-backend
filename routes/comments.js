import {Router} from "express";
import { createComment } from "../controllers/commentController.js";
import { commentRules } from "../validation/comment-validation.js";
const comments = Router();

comments.post("/", commentRules, createComment);


export {comments};