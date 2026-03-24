import passport from "passport";
import { localStrategy } from "./localStrategy.js";
import { jwtStrategy } from "./JWTStrategy.js";

passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);

export default passport;