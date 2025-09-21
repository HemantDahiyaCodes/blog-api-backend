const passport = require("passport");
const LocalStrategy = require("passport-local");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { username: username },
      });
      console.log("The user in local strategy is: ", user);

      // return if no user found
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      // return if password is incorrect
      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) {
        return done(null, false, { message: "Incorrect password" });
      }

      console.log(`Sending user.... named ${user.username}`);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await prisma.user.findUnique({ where: { id } });
//     console.log("User id found: ", user.id);

//     done(null, user);
//   } catch (error) {
//     console.log(error);
//     done(error);
//   }
// });

module.exports = passport;
