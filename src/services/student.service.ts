import { NotFoundError, BadRequestError } from '../utils/errors';
import { Student, CreateStudentDTO, UpdateStudentDTO } from '../models/student.dto';
import StudentRepository from '../repositories/student';
import Bcrypt from '../utils/bcrypt';
import { PurchaseHistory } from '../models/purchase_histories.dto';

class StudentService {
  private bcrypt: Bcrypt;

  constructor(private readonly studentRepository: StudentRepository) {
    this.bcrypt = new Bcrypt();
  }

  async findAll(): Promise<Student[]> {
    try {
      return await this.studentRepository.findAll();
    } catch (error) {
      throw new Error(`Failed to fetch students: ${error.message}`);
    }
  }

  async findById(id: number): Promise<Student & { purchaseHistories: PurchaseHistory[] }> {
    try {
      const student = await this.studentRepository.findById(id);
      if (!student) {
        throw new NotFoundError(`Student with id ${id} not found`);
      }
      return student;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error(`Failed to fetch student: ${error.message}`);
    }
  }

  async create(data: CreateStudentDTO): Promise<Student> {
    try {
      // Check if email already exists
      const existingStudent = await this.studentRepository.findByEmail(data.email);
      if (existingStudent) {
        throw new BadRequestError(`Email '${data.email}' is already registered`);
      }

      // Hash password before saving
      const hashedPassword = await this.bcrypt.hashPassword(data.password);
      const studentData = { ...data, password: hashedPassword };
      
      return await this.studentRepository.create(studentData);
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw error;
      }
      throw new Error(`Failed to create student: ${error.message}`);
    }
  }

  async update(id: number, data: UpdateStudentDTO): Promise<Student> {
    try {
      const student = await this.studentRepository.findById(id);
      if (!student) {
        throw new NotFoundError(`Student with id ${id} not found`);
      }

      // If email is being updated, check if it's already taken
      if (data.email) {
        const existingStudent = await this.studentRepository.findByEmail(data.email);
        if (existingStudent && existingStudent.id !== id) {
          throw new BadRequestError(`Email '${data.email}' is already registered`);
        }
      }

      // If password is being updated, hash it
      if (data.password) {
        data.password = await this.bcrypt.hashPassword(data.password);
      }

      return await this.studentRepository.update(id, data);
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof BadRequestError) {
        throw error;
      }
      throw new Error(`Failed to update student: ${error.message}`);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const student = await this.studentRepository.findById(id);
      if (!student) {
        throw new NotFoundError(`Student with id ${id} not found`);
      }
      await this.studentRepository.delete(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error(`Failed to delete student: ${error.message}`);
    }
  }
}

export default StudentService; 