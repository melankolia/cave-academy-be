export interface User {
  id: number;
  name: string;
  username: string;
  role: string;
  password: string;
}

// For creating a new user (without id since it's auto-generated)
export interface CreateUserDTO {
  name: string;
  username: string;
  role: string;
  password: string;
}

// For updating a user
export interface UpdateUserDTO {
  name?: string;
  username?: string;
  role?: string;
  password?: string;
}

// In-memory storage for users (replace with database in production)
export const users: User[] = []; 