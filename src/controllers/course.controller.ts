import { Request, Response } from "express";
import CourseService from "../services/course.service";
import { handleError } from '../utils/errorHandler';
import { Course } from "../models/course.dto";
import { NotFoundError } from "../utils/errors";

class CourseController {
  private courseService: CourseService;
  
  constructor(courseService: CourseService) {
    this.courseService = courseService;
  }

  async getAllCourses(req: Request, res: Response) {
    try {
      const courses = await this.courseService.findAll();
      res.status(200).json({
        status: 'success',
        data: courses,
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  }

  async getCourseById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const course = await this.courseService.findById(id);
      res.status(200).json({
        status: 'success',
        data: course,
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  }

  async createCourse(req: Request, res: Response) {
    try {
      const course: any = await this.courseService.create(req.body);
      res.status(201).json({
        status: 'success',
        data: {
          id: course.id,
        },
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  }

  async updateCourse(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const course = await this.courseService.update(id, req.body);
      res.status(200).json({
        status: 'success',
        data: course,
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  }

  async deleteCourse (req: Request, res: Response) {
    try {
      const courseId = parseInt(req.params.id);
      
      if (isNaN(courseId)) {
        return res.status(400).json({
          status: "error",
          message: "Invalid course ID"
        });
      }

      await this.courseService.deleteCourse(courseId);

      return res.status(200).json({
        status: "success",
        message: "Course deleted successfully"
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({
          status: "error",
          message: error.message
        });
      }

      return res.status(500).json({
        status: "error",
        message: "Internal server error"
      });
    }
  };
}

export default CourseController;