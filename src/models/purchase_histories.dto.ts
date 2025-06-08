import { Course } from "./course.dto";
import { Student } from "./student.dto";

export interface PurchaseHistory {
    id: number;
    course: Course;
    createdAt: Date;
    updatedAt: Date;
}