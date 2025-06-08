import { eq } from 'drizzle-orm';
import { db } from '../db';
import { Student, CreateStudentDTO, UpdateStudentDTO } from '../models/student.dto';
import { studentTable } from '../schemas/student';
import { PurchaseHistory } from '../models/purchase_histories.dto';

class StudentRepository {
  async findAll(): Promise<Student[]> {
    const students = await db.query.studentTable.findMany();
    return students.map(student => ({
      id: student.id,
      name: student.name,
      email: student.email,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt
    } as Student));
  }

  async findById(id: number): Promise<Student & { purchaseHistories: PurchaseHistory[] } | null> {
    const student = await db.query.studentTable.findFirst({
      where: eq(studentTable.id, id),
      with: {
        purchaseHistories: {
          with: {
            course: true,
          }
        }
      }
    });
    
    if (!student) return null;

    return {
      id: student.id,
      name: student.name,
      email: student.email,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
      purchaseHistories: student.purchaseHistories
    };
  }

  async findByEmail(email: string): Promise<Student | null> {
    const student = await db.query.studentTable.findFirst({
      where: eq(studentTable.email, email)
    });
    
    if (!student) return null;

    return {
      id: student.id,
      name: student.name,
      email: student.email,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt
    };
  }

  async create(data: CreateStudentDTO): Promise<Student> {
    const [student] = await db.insert(studentTable)
      .values({
        name: data.name,
        email: data.email,
        password: data.password,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning();

    return {
      id: student.id,
      name: student.name,
      email: student.email,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt
    };
  }

  async update(id: number, data: UpdateStudentDTO): Promise<Student> {
    const [student] = await db.update(studentTable)
      .set({
        ...data,
        updatedAt: new Date()
      })
      .where(eq(studentTable.id, id))
      .returning();

    return {
      id: student.id,
      name: student.name,
      email: student.email,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt
    };
  }

  async delete(id: number): Promise<void> {
    await db.delete(studentTable)
      .where(eq(studentTable.id, id));
  }
}

export default StudentRepository;
