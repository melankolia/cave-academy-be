import { User } from "./user.dto";

export interface Wiki {
  id?: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  imageUrl: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  user?: User;
}

export interface CreateWikiDTO {
  title: string;
  description: string;
  thumbnailUrl: string;
  imageUrl: string;
  content: string;
  userId: number;
  wikis: {
    title: string;
    description: string;
    thumbnailUrl: string;
    imageUrl: string;
    content: string;
  }[]
}

export interface UpdateWikiDTO {
  id?: number;
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  imageUrl?: string;
  content?: string;
  userId?: number;
  wiki?: {
    id?: number;
    title?: string;
    description?: string;
    thumbnailUrl?: string;
    imageUrl?: string;
    content?: string;
  }[]
}