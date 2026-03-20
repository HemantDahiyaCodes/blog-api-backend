import passport from "passport";
import LocalStrategy from "passport-local";
import { prisma } from "../prismaClientConfig.js";
import bcrypt from "bcryptjs";

export default passport.use(
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