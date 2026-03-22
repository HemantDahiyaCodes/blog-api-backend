import { prisma } from "../prismaClientConfig.js";
import { validationResult } from "express-validator";

async function createComment(req, res) {
  try {
    const result = validationResult(req);

    if (result.isEmpty()) {
      const user = req.user;
      const { postId } = req.params;
      const commentContent = req.body;
      const createComment = await prisma.comment.create({
        data: {
          content: commentContent.content,
          userId: user.id,
          postId: postId,
        },
      });
    }
  } catch (err) {
    throw new Error(err);
  }
}

export { createComment };
