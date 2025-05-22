import express from "express";
import userRouter from "./routes/user";

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// User routes
app.use('/api/users', userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});