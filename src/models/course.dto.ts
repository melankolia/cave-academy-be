export interface ContentCovered {
  id: number;
  parentCourseId: number;
  courseId: number;
  course: {
    secureId: string;
    title: string;
    description: string;
    videoUrl?: string;
    imageUrl?: string;
    level: string;
    type: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface Course {
  id?: number;
  secureId: string;
  title: string;
  description: string;
  videoUrl?: string;
  imageUrl?: string;
  level: string;
  type: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  contentCovered?: ContentCovered[];
}

export interface CreateCourseDTO {
  title: string;
  description: string;
  videoUrl?: string;
  imageUrl?: string;
  level: string;
  type: string;
  content: string;
}

export interface UpdateCourseDTO {
  title?: string;
  description?: string;
  videoUrl?: string;
  imageUrl?: string;
  level?: string;
  type?: string;
  content?: string;
} 