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
router.get('/', Verification.verifyToken, studentController.getAllStudents.bind(studentController));
router.get('/:id', Verification.verifyToken, studentController.getStudentById.bind(studentController));
router.post('/', Verification.verifyToken, studentController.createStudent.bind(studentController));
router.put('/:id', Verification.verifyToken, studentController.updateStudent.bind(studentController));
router.delete('/:id', Verification.verifyToken, studentController.deleteStudent.bind(studentController));

export default router; 