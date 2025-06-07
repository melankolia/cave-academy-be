import { Router } from "express";
import courseRoutes from "./course";
import eventRoutes from "./event";
import newsRoutes from "./news";
import userRoutes from "./user";
import authRoutes from "./auth";
import wikiRoutes from "./wiki";
import topicRoutes from "./topic";
import studentRoutes from "./student";
import activeStudentsRoutes from "./active_students";
import fileRoutes from "./file";

const router = Router();

router.use("/course", courseRoutes);
router.use("/event", eventRoutes);
router.use("/news", newsRoutes);
router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/wiki", wikiRoutes);
router.use("/topic", topicRoutes);
router.use("/student", studentRoutes);
router.use("/active-students", activeStudentsRoutes);
router.use("/files", fileRoutes);

export default router; 