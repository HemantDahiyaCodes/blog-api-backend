const { PrismaClient } = require("../generated/prisma");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

function signUpForm(req, res) {
  res.json({ text: "Get the form!" });
}

async function handleSignUp(req, res) {
  try {
    const { username, password } = req.body;
    console.log("The username is: ", username);
    console.log("The password is: ", password);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (user) {
      console.log("User found: ", username);
      return res.json({ message: "User already exists" });
    } else {
      await prisma.user.create({
        data: {
          username: username,
          password: hashedPassword,
        },
      });
      res.json({ username, password });
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  signUpForm,
  handleSignUp,
};
