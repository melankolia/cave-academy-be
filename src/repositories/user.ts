import { eq } from 'drizzle-orm';
import { db } from '../db';
import { User, CreateUserDTO, UpdateUserDTO } from '../models/user.dto';
import { usersTable } from '../schemas/user';

class UserRepository {
  async findAll(): Promise<User[]> {
    const users = await db.query.usersTable.findMany();
    return users.map(user => ({
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
      password: user.password
    } as User));
  }

  async findByName(name: string): Promise<User | null> {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.name, name)
    });
    
    if (!user) return null;
    
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
      password: user.password
    } as User;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.username, username)
    });
    
    if (!user) return null;
    
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
      password: user.password
    } as User;
  }

  async findById(id: number): Promise<User | null> {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, id)
    });
    
    if (!user) return null;
    
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
      password: user.password
    } as User;
  }

  async create(data: CreateUserDTO): Promise<User> {
    const result = await db
      .insert(usersTable)
      .values(data)
      .returning();
    
    const user = result[0];
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
      password: user.password
    } as User;
  }

  async update(id: number, data: UpdateUserDTO): Promise<User> {
    const result = await db
      .update(usersTable)
      .set(data)
      .where(eq(usersTable.id, id))
      .returning();
    
    const user = result[0];
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
      password: user.password
    } as User;
  }

  async delete(id: number): Promise<void> {
    await db
      .delete(usersTable)
      .where(eq(usersTable.id, id));
  }
}

export default UserRepository;