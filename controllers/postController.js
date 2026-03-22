import { prisma } from "../prismaClientConfig.js";


async function allPosts(req, res) {
  const posts = await prisma.post.findMany();

  res.json({posts})
}


async function getPost(req, res) {
  const { postId } = req.params;
  console.log("Post id in req.params is: ", postId);

  const post = await prisma.post.findFirst({
    where: { id: parseFloat(postId)},
    include: {
      comments: true,
    },
  });
  console.log("Found the post!");

  res.json({ post });
}

async function createPost(req, res) {
  const postInReq = req.body;
  console.log("The post in request is: ", postInReq);

  const userInReq = req.user;

  const user = await prisma.user.findUnique({
    where: {
      username: userInReq.username,
      isAdmin: true
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

export {
  getPost,
  allPosts,
  createPost,
}