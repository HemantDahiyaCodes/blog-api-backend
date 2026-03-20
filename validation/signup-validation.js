import { body } from "express-validator";
import { prisma } from "../prismaClientConfig.js";

export const validationRules = [
  body("username").notEmpty().isLength(2, 15),
  body("username").custom(async (value, {req}) => {
    console.log("The username in req is: ", req.body.username);
    const user = await prisma.user.findUnique({
      where: { username: req.body.username },
    });

    if(user) {
        throw new Error(`${user.username} already exists`);
    }
  }),
  body("password").isAlphanumeric().isLength(5, 15),
  body("email").isEmail().notEmpty(),
];