const express = require("express");
const app = express();

// Import routes
const signUp = require("./routes/sign-up");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/users/sign-up", signUp);

// Server
app.listen(process.env.PORT || 8000, () => {
  console.log("Server started!");
});
