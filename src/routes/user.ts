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
router.get('/', Verification.verifyToken, (req, res) => userController.getAll(req, res));
router.get('/:id', Verification.verifyToken, (req, res) => userController.getById(req, res));
router.post('/', Verification.verifyToken, (req, res) => userController.create(req, res));
router.put('/:id', Verification.verifyToken, (req, res) => userController.update(req, res));
router.delete('/:id', Verification.verifyToken, (req, res) => userController.delete(req, res));

export default router; 