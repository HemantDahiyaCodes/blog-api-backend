import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt as extractJwt } from "passport-jwt";
import { prisma } from "../prismaClientConfig.js";

const options = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(), // Get the token from "authorization" header.
  secretOrKey: process.env.SECRET_KEY,
};

passport.use(
  new JwtStrategy(options, async function (jwt_payload, done) {
    console.log("The user in JWT strategy is: ", jwt_payload.user.id);
    const user = await prisma.user.findUnique({
      where: { id: jwt_payload.user.id },
    });

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  }),
);
