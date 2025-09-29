const {PrismaClient} = require("./generated/prisma");
const prisma = new PrismaClient();

// async function createPost() {
//     await prisma.post.create({
//         data: {
//             id: 2,
//             authorId: 2,
//             content: "This is the another latest post!",
//         }, include: {
//             comments: true
//         }
//     })
// }

// createPost();