import express from "express";
const app = express();
import passport from "./auth/passportConfig.js";
import cors from "cors";
import "dotenv/config";
const PORT = process.env.PORT || 8000;

const corsOptions = {
  origin: [process.env.FRONTEND_01, process.env.PRODUCTION_URL],
  credentials: true,
  methods: 'GET, POST, PUT, DELETE',
}

app.use(cors(corsOptions));

// Import routes
import { signUp } from "./routes/sign-up.js";
import { login } from "./routes/log-in.js";
import { posts } from "./routes/posts.js";

// Middlewares
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Using routes
app.use("/users", signUp);
app.use("/sessions", login);
app.use("/posts", posts);

// Server
app.listen(`${PORT}`, () => {
  console.log("Server started at port number: ", PORT);
})