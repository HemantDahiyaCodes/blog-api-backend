import { prisma } from "../prismaClientConfig.js";

async function allPosts(req, res) {
  const posts = await prisma.post.findMany();

  res.json({ posts });
}

async function getPost(req, res) {
  const { postId } = req.params;

  const post = await prisma.post.findFirst({
    where: { id: parseFloat(postId) },
    include: {
      comments: true,
      author: true,
    },
  });

  const user = req.user;

  res.json({ post });
}

async function createPost(req, res) {
  const postInReq = req.body;
  console.log("The post in request is: ", postInReq);

  const userInReq = req.user; // Stores the user in req for verifying

  const user = await prisma.user.findUnique({
    where: {
      username: userInReq.username,
      isAdmin: true,
    },
  });

  const post = await prisma.post.create({
    data: {
      authorId: parseInt(user.id),
      title: postInReq.title,
      content: postInReq.content,
      description: postInReq.description,
    },
  });

  res.json(post);
}

export { getPost, allPosts, createPost };
