import { NotFoundError } from '../utils/errors';
import { Course, CreateCourseDTO, UpdateCourseDTO } from '../models/course.dto';
import CourseRepository from '../repositories/course';

class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {}

  async findAll(): Promise<Course[]> {
    try {
      return await this.courseRepository.findAll();
    } catch (error) {
      throw new Error(`Failed to fetch courses: ${error.message}`);
    }
  }

  async findById(id: number): Promise<Course> {
    try {
      const course = await this.courseRepository.findById(id);
      if (!course) {
        throw new NotFoundError(`Course with id ${id} not found`);
      }
      return course;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error(`Failed to fetch course: ${error.message}`);
    }
  }

  async findBySecureId(secureId: string): Promise<Course> {
    try {
      const course = await this.courseRepository.findBySecureId(secureId);
      if (!course) {
        throw new NotFoundError(`Course with secure id ${secureId} not found`);
      }
      return course;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error(`Failed to fetch course: ${error.message}`);
    }
  }

  async create(data: CreateCourseDTO): Promise<Course> {
    try {
      return await this.courseRepository.create(data);
    } catch (error) {
      throw new Error(`Failed to create course: ${error.message}`);
    }
  }

  async updateBySecureId(secureId: string, data: UpdateCourseDTO): Promise<Course> {
    try {
      const course = await this.courseRepository.findBySecureId(secureId);
      if (!course) {
        throw new NotFoundError(`Course with secure id ${secureId} not found`);
      }
      return await this.courseRepository.updateBySecureId(secureId, data);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error(`Failed to update course: ${error.message}`);
    }
  }

  async deleteBySecureId(secureId: string): Promise<void> {
    try {
      const course = await this.courseRepository.findBySecureId(secureId);
      if (!course) {
        throw new NotFoundError(`Course with secure id ${secureId} not found`);
      }
      await this.courseRepository.deleteBySecureId(secureId);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error(`Failed to delete course: ${error.message}`);
    }
  }
}

export default CourseService; 