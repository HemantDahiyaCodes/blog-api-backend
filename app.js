// const express = require("express");
import express from "express";
const app = express();
import {default as passport} from "./auth/localStrategy.js";
import cors from "cors";
import "dotenv/config";

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  metohds: 'GET, POST',
}

app.use(cors(corsOptions));

// Import routes
import { signUp } from "./routes/sign-up.js";
import { login } from "./routes/log-in.js";
import { posts } from "./routes/posts.js";
const port = 8000;

// Middlewares
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Using routes
app.use("/users/sign-up", signUp);
app.use("/users/log-in", login);
app.use("/posts", posts);

// Server
app.listen(process.env.PORT || port, () => {
  console.log(`Server started at port number: ${port}`);
});