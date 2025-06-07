import { Request, Response } from "express";
import ActiveStudentsService from "../services/active_students.service";
import { handleError } from '../utils/errorHandler';

class ActiveStudentsController {
  private activeStudentsService: ActiveStudentsService;

  constructor(activeStudentsService: ActiveStudentsService) {
    this.activeStudentsService = activeStudentsService;
  }

  async getAllActiveStudents(req: Request, res: Response) {
    try {
      const activeStudents = await this.activeStudentsService.findAll();
      res.status(200).json({
        status: 'success',
        data: activeStudents
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  }

  async getActiveStudentsCountPerCourse(req: Request, res: Response) {
    try {
      const counts = await this.activeStudentsService.getActiveStudentsCountPerCourse();
      res.status(200).json({
        status: 'success',
        data: counts
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  }
}

export default ActiveStudentsController; 