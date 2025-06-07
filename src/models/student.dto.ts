export interface Student {
  id: number;
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateStudentDTO {
  name: string;
  email: string;
  password: string;
}

export interface UpdateStudentDTO {
  name?: string;
  email?: string;
  password?: string;
} 