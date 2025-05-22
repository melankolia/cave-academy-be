import { User } from "./user.dto";

export interface Event {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  content: string;
  authorId?: number;
  author?: User;
  startDate: Date;
  endDate: Date;
  level: string;
  isOnline: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEventDTO {
  title: string;
  description: string;
  imageUrl?: string;
  content: string;
  authorId: number;
  startDate: Date;
  endDate: Date;
  level: string;
  isOnline: boolean;
}

export interface UpdateEventDTO {
  title?: string;
  description?: string;
  imageUrl?: string;
  content?: string;
  startDate?: Date;
  endDate?: Date;
  level?: string;
  isOnline?: boolean;
} 