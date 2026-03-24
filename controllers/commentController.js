import { prisma } from "../prismaClientConfig.js";
import { validationResult } from "express-validator";

async function createComment(req, res) {
  try {
    const result = validationResult(req);

    if (result.isEmpty()) {
      const { postId } = req.params;
      const {content} = req.body;
      const {user} = req;

      const comment = await prisma.comment.create({
        data: {
          content,
          userId: parseInt(user.id),
          postId: parseInt(postId),
          Username: user.username,
        },
      });

      res.json({comment})
    }
  } catch (err) {
    throw new Error(err);
  }
}

export { createComment };