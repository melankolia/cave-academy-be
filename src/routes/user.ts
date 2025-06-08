import { Router } from 'express';
import UserController from '../controllers/user.controller';
import  UserService  from '../services/user.service';
import  UserRepository  from '../repositories/user';
import Verification from '../middleware/verification';

// Initialize dependencies
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const router = Router();

// Routes
router.get('/', Verification.verifyToken, userController.getAll.bind(userController));
router.get('/:id', Verification.verifyToken, userController.getById.bind(userController));
router.post('/', Verification.verifyToken, userController.create.bind(userController));
router.put('/:id', Verification.verifyToken, userController.update.bind(userController));
router.delete('/:id', Verification.verifyToken, userController.delete.bind(userController));

export default router; 