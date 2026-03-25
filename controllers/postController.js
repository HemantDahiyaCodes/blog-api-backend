import { prisma } from "../prismaClientConfig.js";

async function allPosts(req, res) {
  try {
    const posts = await prisma.post.findMany();

    res.json({ posts });
  } catch (err) {
    console.log(err);
  }
}

async function getPost(req, res) {
  try {
    const { postId } = req.params;

    const post = await prisma.post.findFirst({
      where: { id: parseInt(postId) },
      include: {
        author: {
          select: {
            username: true,
            id: true,
          },
        },
        comments: true,
      },
    });

    return res.json(post);
  } catch (err) {
    console.log(err);
  }
}

async function createPost(req, res) {
  try {
    const { title, description, content } = req.body;
    const { user } = req;

    const post = await prisma.post.create({
      data: {
        authorId: parseInt(user.id),
        title,
        description,
        content,
      },
    });
    return res.json(post);
  } catch (err) {
    console.log(err);
  }
}

export { getPost, allPosts, createPost };
