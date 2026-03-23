import { prisma } from "../prismaClientConfig.js";
import { validationResult } from "express-validator";

async function createComment(req, res) {
  try {
    const result = validationResult(req);

    console.log("The user is: ", req.user);

    if (result.isEmpty()) {
      const user = req.user;

      const { postId } = req.params;
      const commentContent = req.body;
      console.log(commentContent);

      const comment = await prisma.comment.create({
        data: {
          content: commentContent.content,
          userId: parseInt(user.id),
          postId: parseInt(postId),
          Username: user.username,
        },
      });

      res.json({comment, user})
    }
  } catch (err) {
    throw new Error(err);
  }
}

export { createComment };