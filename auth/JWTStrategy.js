const jwtStrategy = require("passport-jwt").Strategy;
const passport = require("passport");
const extractJwt = require("passport-jwt").ExtractJwt;
const dotenv = require("dotenv").config();
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const options = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(), // Get the token from "authorization" header.
  secretOrKey: process.env.SECRET_KEY,
};

module.exports = passport.use(
  new jwtStrategy(options, async function (jwt_paylaod, done) {
    console.log("The user in JWT strategy is: ", jwt_paylaod.user.id);
    const user = await prisma.user.findUnique({
      where: { id: jwt_paylaod.user.id },
    });
    console.log("The user in JWT strategy is: ", user);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  })
);
