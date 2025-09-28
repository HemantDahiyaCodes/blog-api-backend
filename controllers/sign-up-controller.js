const { PrismaClient } = require("../generated/prisma");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

function signUpForm(req, res) {
  res.json({ text: "Get the form!" });
}

async function handleSignUp(req, res) {
  try {
    const { username, password } = req.body;

    if(username.length < 4) {
      return res.json({notValid : "too_short"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (user) {
      return res.json({ userExists: true });
    } else {
      await prisma.user.create({
        data: {
          username: username,
          password: hashedPassword,
        },
      });
      res.json({ username, password, success: true });
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  signUpForm,
  handleSignUp,
};
