import express from "express";
import cors from "cors";
import fs from "fs";
import logger from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user";
import authRouter from "./routes/auth";

const app = express();

// Use Cors
app.use(cors());

// Use Express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Init Cross Server Scripting
app.use(helmet.xssFilter());

// Init Morgan
const accessLogStream = fs.createWriteStream("access.log", {
  flags: "a",
});

app.use(logger("combined", { stream: accessLogStream }));
app.use(logger("combined"));
app.use("/output", express.static("public"));

// Middleware for parsing JSON bodies
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// User routes
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;