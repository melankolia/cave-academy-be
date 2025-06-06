import { User } from "./user.dto";

export interface News {
  id: number;
  title: string;
  content: string;
  description: string;
  imageUrl?: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateNewsDTO {
  title: string;
  content: string;
  description: string;
  imageUrl?: string;
  authorId: number;
}

export interface UpdateNewsDTO {
  title?: string;
  content?: string;
  description?: string;
  imageUrl?: string;
} 