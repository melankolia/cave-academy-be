import express from "express";
import cors from "cors";
import { createWriteStream } from "fs";
import logger from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user";
import authRouter from "./routes/auth";
import newsRouter from "./routes/news";
import eventRouter from "./routes/event";
import courseRouter from "./routes/course";

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
const accessLogStream = createWriteStream("access.log", {
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
app.use('/api/news', newsRouter);
app.use('/api/events', eventRouter);
app.use('/api/courses', courseRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;