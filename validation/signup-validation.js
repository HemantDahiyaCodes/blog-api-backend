import { body } from "express-validator";
import { prisma } from "../prismaClientConfig.js";

export const validationRules = [
  body("username").notEmpty().isLength({min: 5, max: 25}),
  body("username").custom(async (value, {req}) => {
    const user = await prisma.user.findUnique({
      where: { username: value},
    });

    if(user) {
        throw new Error(`${user.username} already exists`);
    }

    return true;
  }),
  body("password").isLength({min: 5, max: 35}).matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d_]+$/).withMessage("Password must contain a mix of letters, at least one number"),
  body("email").isEmail().notEmpty(),
];