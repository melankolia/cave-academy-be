export interface Course {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  level: string;
  type: string;
  content: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  contentCovered?: (ContentCovered | ParentContentCovered)[]
}

export interface ContentCovered {
    parentCourseId: number;
    courseId: number;
    level: number;
    type: string;
}
 

export interface ParentContentCovered {
    parentCourseId: number;
    courseId: number;
    level: number;
    type: string;
    title: string;
    subContents: SubContentCovered[]
}

export interface SubContentCovered {
    contentCoveredId: number;
    number: string;
    title: string;
    description: string;
    subCourses: SubCourse[]
}

export interface SubCourse {
    subContentId: number;
    title: string;
    description: string;
}