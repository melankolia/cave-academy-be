import { Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service';
import { CreateUserDTO, UpdateUserDTO } from '../models/user';
import { handleError } from '../utils/errorHandler';

class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getAll(req: Request, res: Response) {
    try {
      const users = await this.userService.findAll();
      res.json({
        status: 'success',
        data: users
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  };

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await this.userService.findById(id);
      res.json({
        status: 'success',
        data: user
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  };

  async create(req: Request, res: Response) {
    try {
      const userData: CreateUserDTO = req.body;
      const newUser = await this.userService.create(userData);
      res.status(201).json({
        status: 'success',
        data: newUser
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  };

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const userData: UpdateUserDTO = req.body;
      const updatedUser = await this.userService.update(id, userData);
      res.json({
        status: 'success',
        data: updatedUser
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  };

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await this.userService.delete(id);
      res.json({
        status: 'success',
        message: 'User deleted successfully'
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  };
} 

export default UserController;