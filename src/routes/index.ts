import { Router } from "express";
import courseRoutes from "./course";
import eventRoutes from "./event";
import newsRoutes from "./news";
import userRoutes from "./user";
import authRoutes from "./auth";
import wikiRoutes from "./wiki";
import topicRoutes from "./topic";

const router = Router();

router.use("/courses", courseRoutes);
router.use("/events", eventRoutes);
router.use("/news", newsRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/wikis", wikiRoutes);
router.use("/topics", topicRoutes);

export default router; 