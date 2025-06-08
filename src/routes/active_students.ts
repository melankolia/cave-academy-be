import { Router } from 'express';
import ActiveStudentsController from '../controllers/active_students.controller';
import ActiveStudentsService from '../services/active_students.service';
import ActiveStudentsRepository from '../repositories/active_students';
import Verification from '../middleware/verification';

// Initialize dependencies
const activeStudentsRepository = new ActiveStudentsRepository();
const activeStudentsService = new ActiveStudentsService();
const activeStudentsController = new ActiveStudentsController(activeStudentsService);

const router = Router();

// Active Students routes
router.get('/', Verification.verifyToken, (req, res) => activeStudentsController.getAllActiveStudents(req, res));
router.get('/count-per-course', Verification.verifyToken, (req, res) => activeStudentsController.getActiveStudentsCountPerCourse(req, res));

export default router; 