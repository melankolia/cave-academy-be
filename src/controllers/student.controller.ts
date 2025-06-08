import { Request, Response } from "express";
import StudentService from "../services/student.service";
import { CreateStudentDTO, UpdateStudentDTO } from "../models/student.dto";
import { handleError } from '../utils/errorHandler';

class StudentController {
  private studentService: StudentService;

  constructor(studentService: StudentService) {
    this.studentService = studentService;
  }

  async createStudent(req: Request, res: Response) {
    try {
      const data: CreateStudentDTO = req.body;
      const student = await this.studentService.create(data);
      res.status(201).json({
        status: 'success',
        data: student
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  }

  async getAllStudents(req: Request, res: Response) {
    try {
      const students = await this.studentService.findAll();
      res.status(200).json({
        status: 'success',
        data: students
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  }

  async getStudentById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const student = await this.studentService.findById(id);
      res.status(200).json({
        status: 'success',
        data: student
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  }

  async updateStudent(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data: UpdateStudentDTO = req.body;
      const student = await this.studentService.update(id, data);
      res.status(200).json({
        status: 'success',
        data: student
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  }

  async deleteStudent(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await this.studentService.delete(id);
      res.status(200).json({
        status: 'success',
        message: 'Student deleted successfully'
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  }
}

export default StudentController; 