import { prisma } from "../prismaClientConfig.js";
import bcrypt from "bcryptjs";

async function adminUser() {
  const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  console.log(hash);
  const admin = await prisma.user.upsert({
    where: { username: "hemant_dahiya" },
    update: {},
    create: {
      username: "hemant_dahiya",
      email: "hemantdahiyacodes@gmail.com",
      password: hash,
      isAdmin: true,
    },
  });
}

adminUser()
  .catch(console.error())
  .finally(() => prisma.$disconnect());
