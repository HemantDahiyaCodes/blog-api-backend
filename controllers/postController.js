const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function getPost(req, res) {
  const { postId } = req.params;

  const post = await prisma.post.findFirst({where: {id : postId}});
  console.log("Found the post!");

  res.json({message: `Getting post with the id: ${post.id}`});
}

function postComment(req, res) {
    const {postId} = req.params;
    console.log("The id of the post is: ", postId);

    const comment = req.body;
    console.log("The comment is: ", comment);

    res.json(comment);
}

module.exports = {
  getPost,
  postComment
};
