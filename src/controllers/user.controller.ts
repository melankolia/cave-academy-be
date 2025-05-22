import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { CreateUserDTO, UpdateUserDTO } from '../models/user';
import { AppError } from '../utils/errors';

export class UserController {
  constructor(private readonly userService: UserService) {}

  handleError(error: Error, res: Response) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: error.status,
        message: error.message
      });
    }

    console.error('Unexpected error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.findAll();
      res.json({
        status: 'success',
        data: users
      });
    } catch (error) {
      this.handleError(error as Error, res);
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const user = await this.userService.findById(id);
      res.json({
        status: 'success',
        data: user
      });
    } catch (error) {
      this.handleError(error as Error, res);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const userData: CreateUserDTO = req.body;
      const newUser = await this.userService.create(userData);
      res.status(201).json({
        status: 'success',
        data: newUser
      });
    } catch (error) {
      this.handleError(error as Error, res);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const userData: UpdateUserDTO = req.body;
      const updatedUser = await this.userService.update(id, userData);
      res.json({
        status: 'success',
        data: updatedUser
      });
    } catch (error) {
      this.handleError(error as Error, res);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await this.userService.delete(id);
      res.json({
        status: 'success',
        message: 'User deleted successfully'
      });
    } catch (error) {
      this.handleError(error as Error, res);
    }
  };
} 