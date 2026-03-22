import { prisma } from "../prismaClientConfig.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

async function handleSignUp(req, res) {
  try {
    const result = validationResult(req);

    if (result.isEmpty()) {
      const { username, password, email } = req.body;

      // Bcrypt to hash the password before storing
      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.create({
        data: {
          username: username,
          password: hashedPassword,
          email: email,
        },
      });

      return res.json({success: true});
    }
  } catch (err) {
    console.log(err);
  }
}

export { handleSignUp };
