const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function getPost(req, res) {
  const { postId } = req.params;

  const post = await prisma.post.findFirst({
    where: { id: parseFloat(postId), authorId: 2 },
    include: {
      comments: true,
    },
  });
  console.log("Found the post!");

  res.json({ post });
}

async function postComment(req, res) {
  const username = req.user;
  console.log("User is: ", username);

  const { postId } = req.params;
  console.log("The id of the post is: ", postId);

  const commentInReq = req.body;
  console.log("The comment is: ", commentInReq);

  const comment = await prisma.comment.create({
    data: {
      userId: username.id,
      postId: parseFloat(postId),
      content: commentInReq.comment,
      username: username.username
    },
  });

  res.json({ comment: comment });
}

async function allPosts(req, res) {
  const userInReq = req.user;
  console.log("User in postcontroller: ", userInReq);

  const username = "hemant";

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },

    include: {
      posts: true,
    },
  });

  console.log("Posts of the user: ", user.posts);

  res.json({ posts: user.posts, userInReq });
}
module.exports = {
  getPost,
  postComment,
  allPosts,
};
