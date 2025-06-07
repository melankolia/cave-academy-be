import { Router } from 'express';
import StudentController from '../controllers/student.controller';
import StudentService from '../services/student.service';
import StudentRepository from '../repositories/student';
import Verification from '../middleware/verification';

// Initialize dependencies
const studentRepository = new StudentRepository();
const studentService = new StudentService(studentRepository);
const studentController = new StudentController(studentService);

const router = Router();

// Student routes
router.get('/', Verification.verifyToken, (req, res) => studentController.getAllStudents(req, res));
router.get('/:id', Verification.verifyToken, (req, res) => studentController.getStudentById(req, res));
router.post('/', Verification.verifyToken, (req, res) => studentController.createStudent(req, res));
router.put('/:id', Verification.verifyToken, (req, res) => studentController.updateStudent(req, res));
router.delete('/:id', Verification.verifyToken, (req, res) => studentController.deleteStudent(req, res));

export default router; 