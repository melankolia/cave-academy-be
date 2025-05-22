import { Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service';
import { CreateUserDTO, UpdateUserDTO } from '../models/user.dto';
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
        data: users.map(user => ({
          id: user.id,
          name: user.name,
          username: user.username,
          role: user.role,
        }))
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
        data: {
          id: user.id,
          name: user.name,
          username: user.username,
          role: user.role,
        }
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
        data: {
          id: newUser.id,
          name: newUser.name,
          username: newUser.username,
          role: newUser.role,
        }
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
        data: {
          id: updatedUser.id,
          name: updatedUser.name,
          username: updatedUser.username,
          role: updatedUser.role,
        }
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