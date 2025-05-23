import { Router } from "express";
import CourseController from "../controllers/course.controller";
import CourseService from "../services/course.service";
import CourseRepository from "../repositories/course";
import Verification from "../middleware/verification";

const router = Router();

// Initialize dependencies
const courseRepository = new CourseRepository();
const courseService = new CourseService(courseRepository);
const courseController = new CourseController(courseService);

// Public routes
router.get("/", (req, res) => courseController.getAllCourses(req, res));
router.get("/:secureId", (req, res) => courseController.getCourseBySecureId(req, res));

// Protected routes (require authentication)
router.post("/", Verification.verifyToken, (req, res) => courseController.createCourse(req, res));
router.put("/:secureId", Verification.verifyToken, (req, res) => courseController.updateCourse(req, res));
router.delete("/:secureId", Verification.verifyToken, (req, res) => courseController.deleteCourse(req, res));

export default router; 