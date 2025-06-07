import { Router } from "express";
import CourseController from "../controllers/course.controller";
import CourseService from "../services/course.service";
import {CourseRepository} from "../repositories/course";
import Verification from "../middleware/verification";



const router = Router();

const courseRepository = new CourseRepository();
const courseService = new CourseService(courseRepository);
const courseController = new CourseController(courseService);

router.get("/", Verification.verifyToken, courseController.getAllCourses.bind(courseController));
router.get("/:id", Verification.verifyToken, courseController.getCourseById.bind(courseController));
router.post("/", Verification.verifyToken, courseController.createCourse.bind(courseController));
router.put("/:id", Verification.verifyToken, courseController.updateCourse.bind(courseController));
router.delete("/:id", Verification.verifyToken, courseController.deleteCourse.bind(courseController));

export default router;