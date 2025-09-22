const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("./auth/localStrategy");

// Import routes
const signUp = require("./routes/sign-up");
const login = require("./routes/log-in");
const posts = require("./routes/posts");

// Middlewares
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Using routes
app.use("/users/sign-up", signUp);
app.use("/users/log-in", login);
app.use("/users/posts", posts);

// Server
app.listen(process.env.PORT || 8000, () => {
  console.log("Server started!");
});
