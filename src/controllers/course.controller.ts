import { Request, Response } from "express";
import CourseService from "../services/course.service";
import { CreateCourseDTO, UpdateCourseDTO } from "../models/course.dto";
import { handleError } from '../utils/errorHandler';

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
        data: courses
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
        data: course
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  }

  async getCourseBySecureId(req: Request, res: Response) {
    try {
      const secureId = req.params.secureId;
      const course = await this.courseService.findBySecureId(secureId);
      res.status(200).json({
        status: 'success',
        data: course
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  }

  async createCourse(req: Request, res: Response) {
    try {
      const data: CreateCourseDTO = req.body;
      const course = await this.courseService.create(data);
      res.status(201).json({
        status: 'success',
        data: course
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  }

  async updateCourse(req: Request, res: Response) {
    try {
      const secureId = req.params.secureId;
      const data: UpdateCourseDTO = req.body;
      const course = await this.courseService.updateBySecureId(secureId, data);
      res.status(200).json({
        status: 'success',
        data: course
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  }

  async deleteCourse(req: Request, res: Response) {
    try {
      const secureId = req.params.secureId;
      await this.courseService.deleteBySecureId(secureId);
      res.status(200).json({
        status: 'success',
        message: 'Course deleted successfully'
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  }
}

export default CourseController; 