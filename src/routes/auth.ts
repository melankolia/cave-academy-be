import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import AuthService from '../services/auth.service';
import UserRepository from '../repositories/user';
import JsonWebToken from '../utils/jwt';

// Initialize dependencies
const userRepository = new UserRepository();
const jsonWebToken = new JsonWebToken();
const authService = new AuthService(userRepository, jsonWebToken);
const authController = new AuthController(authService);

const router = Router();

// Auth routes
router.post('/login',(req, res) => authController.login(req, res));

export default router; 