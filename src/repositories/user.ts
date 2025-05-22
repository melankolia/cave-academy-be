import { eq } from 'drizzle-orm';
import { db } from '../db';
import { User, CreateUserDTO, UpdateUserDTO } from '../models/user';
import { usersTable } from '../schemas/user';

export class UserRepository {
  async findAll(): Promise<User[]> {
    const users = await db.query.usersTable.findMany();
    return users.map(user => ({
      id: user.id as number,
      name: user.name as string,
      role: user.role as string,
      password: user.password as string
    }));
  }

  async findById(id: number): Promise<User | null> {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, id)
    });
    
    if (!user) return null;
    
    return {
      id: user.id as number,
      name: user.name as string,
      role: user.role as string,
      password: user.password as string
    };
  }

  async create(data: CreateUserDTO): Promise<User> {
    const result = await db
      .insert(usersTable)
      .values(data)
      .returning();
    
    const user = result[0];
    return {
      id: user.id as number,
      name: user.name as string,
      role: user.role as string,
      password: user.password as string
    };
  }

  async update(id: number, data: UpdateUserDTO): Promise<User> {
    const result = await db
      .update(usersTable)
      .set(data)
      .where(eq(usersTable.id, id))
      .returning();
    
    const user = result[0];
    return {
      id: user.id as number,
      name: user.name as string,
      role: user.role as string,
      password: user.password as string
    };
  }

  async delete(id: number): Promise<void> {
    await db
      .delete(usersTable)
      .where(eq(usersTable.id, id));
  }
}
