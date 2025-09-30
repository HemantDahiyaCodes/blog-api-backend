const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function getPost(req, res) {
  const { postId } = req.params;
  console.log("Post id in req.params is: ", postId);
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
      username: username.username,
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

async function createPost(req, res) {
  const postInReq = req.body;
  console.log("The post in request is: ", postInReq);

  const user = await prisma.user.findUnique({
    where: {
      id: 2,
    }
  })

  const post = await prisma.post.create({
    data: {
      authorId: parseFloat(user.id),
      title: postInReq.title,
      content: postInReq.content,
    }
  });

  res.json(post);
}

async function deleteComment(req, res) {
  const postId = req.params.postId;
  console.log(postId)

  const commentId = req.params.commentId;
  console.log(commentId)

  const post = await prisma.post.findFirst({
    where: {id: parseFloat(postId)},
    include: {
      comments: true
    }
  })

  const comment = await prisma.comment.delete({
    where: {
      id: parseFloat(commentId),
      postId: post.id,
    }
  })

  console.log("Comment Deleted");
  console.log("All comments", post.comments);
}
module.exports = {
  getPost,
  postComment,
  allPosts,
  createPost,
  deleteComment
};
