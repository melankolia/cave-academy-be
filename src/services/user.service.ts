import { NotFoundError } from '../utils/errors';
import { User, CreateUserDTO, UpdateUserDTO } from '../models/user';
import { UserRepository } from '../repositories/user';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
    }
    return user;
  }

  async create(data: CreateUserDTO): Promise<User> {
    return this.userRepository.create(data);
  }

  async update(id: number, data: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
    }
    return this.userRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
    }
    await this.userRepository.delete(id);
  }
} 