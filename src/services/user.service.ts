import { NotFoundError, BadRequestError } from '../utils/errors';
import { User, CreateUserDTO, UpdateUserDTO } from '../models/user.dto';
import UserRepository from '../repositories/user';
import Bcrypt from '../utils/bcrypt';

class UserService {
  private bcrypt: Bcrypt;

  constructor(private readonly userRepository: UserRepository) {
    this.bcrypt = new Bcrypt();
  }

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
    // Check if username already exists
    const existingUserByUsername = await this.userRepository.findByUsername(data.username);
    if (existingUserByUsername) {
      throw new BadRequestError(`Username '${data.username}' is already taken`);
    }

    // Hash the password before storing
    const hashedPassword = await this.bcrypt.hashPassword(data.password);
    return this.userRepository.create({
      ...data,
      password: hashedPassword
    });
  }

  async update(id: number, data: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
    }

    // If updating username, check if new username is already taken by another user
    if (data.username) {
      const existingUser = await this.userRepository.findByUsername(data.username);
      if (existingUser && existingUser.id !== id) {
        throw new BadRequestError(`Username '${data.username}' is already taken`);
      }
    }

    // If updating name, check if new name is already taken by another user
    if (data.name) {
      const existingUser = await this.userRepository.findByName(data.name);
      if (existingUser && existingUser.id !== id) {
        throw new BadRequestError(`Name '${data.name}' is already taken`);
      }
    }

    // If password is being updated, hash it
    if (data.password) {
      data.password = await this.bcrypt.hashPassword(data.password);
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

export default UserService;