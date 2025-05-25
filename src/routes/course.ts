import { Router } from "express";
import CourseController from "../controllers/course.controller";
import CourseService from "../services/course.service";
import {CourseRepository} from "../repositories/course";
import Verification from "../middleware/verification";



const router = Router();

const courseRepository = new CourseRepository();
const courseService = new CourseService(courseRepository);
const courseController = new CourseController(courseService);

router.get("/", Verification.verifyToken, (req, res) => courseController.getAllCourses(req, res));
router.get("/:id", Verification.verifyToken, (req, res) => courseController.getCourseById(req, res));
router.post("/", Verification.verifyToken, (req, res) => courseController.createCourse(req, res));
router.put("/:id", Verification.verifyToken, (req, res) => courseController.updateCourse(req, res));
router.delete("/:id", Verification.verifyToken, (req, res) => courseController.deleteCourse(req, res));

export default router;