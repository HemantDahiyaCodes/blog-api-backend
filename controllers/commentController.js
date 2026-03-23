import { prisma } from "../prismaClientConfig.js";
import { validationResult } from "express-validator";

async function createComment(req, res) {
  try {
    const result = validationResult(req);

    if (result.isEmpty()) {
      const user = req.user;


      const { postId } = req.params;
      const commentContent = req.body;
      const comment = await prisma.comment.create({
        data: {
          content: commentContent.content,
          userId: parseInt(user.id),
          postId: parseInt(postId),
        },
      });

      return res.json({comment, user})
    }
  } catch (err) {
    throw new Error(err);
  }
}

export { createComment };