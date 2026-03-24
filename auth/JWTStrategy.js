import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../prismaClientConfig.js";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Get the token from "authorization" header.
  secretOrKey: process.env.SECRET_KEY,
};

export const jwtStrategy = new JwtStrategy(options, async function (
  jwt_payload,
  done,
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: jwt_payload.id },
    });

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});
