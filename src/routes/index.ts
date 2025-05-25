import { Router } from "express";
import courseRoutes from "./course";
import eventRoutes from "./event";
import newsRoutes from "./news";
import userRoutes from "./user";
import authRoutes from "./auth";

const router = Router();

router.use("/courses", courseRoutes);
router.use("/events", eventRoutes);
router.use("/news", newsRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);

export default router; 