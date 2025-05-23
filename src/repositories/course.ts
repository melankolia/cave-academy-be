import { eq, desc } from 'drizzle-orm';
import { db } from '../db';
import { courseTable, contentCoveredTable } from '../schemas/course';
import { Course, CreateCourseDTO, UpdateCourseDTO } from '../models/course.dto';

class CourseRepository {
  async findAll(): Promise<Course[]> {
    const courses = await db.query.courseTable.findMany({
      orderBy: desc(courseTable.createdAt)
    });

    return courses.map(course => ({
      secureId: course.secureId,
      title: course.title,
      description: course.description,
      videoUrl: course.videoUrl,
      imageUrl: course.imageUrl,
      level: course.level,
      type: course.type,
      content: course.content,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt
    } as Course));
  }

  async findById(id: number): Promise<Course | null> {
    const course = await db.query.courseTable.findFirst({
      where: eq(courseTable.id, id),
      with: {
        asParentCourse: {
          with: {
            coveredCourse: true
          }
        }
      }
    });
    
    if (!course) return null;
    
    return {
      secureId: course.secureId,
      title: course.title,
      description: course.description,
      videoUrl: course.videoUrl,
      imageUrl: course.imageUrl,
      level: course.level,
      type: course.type,
      content: course.content,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
      contentCovered: course.asParentCourse.map(cc => ({
        id: cc.id,
        parentCourseId: cc.parentCourseId,
        courseId: cc.courseId,
        course: {
          secureId: cc.coveredCourse.secureId,
          title: cc.coveredCourse.title,
          description: cc.coveredCourse.description,
          videoUrl: cc.coveredCourse.videoUrl,
          imageUrl: cc.coveredCourse.imageUrl,
          level: cc.coveredCourse.level,
          type: cc.coveredCourse.type,
          content: cc.coveredCourse.content,
          createdAt: cc.coveredCourse.createdAt,
          updatedAt: cc.coveredCourse.updatedAt
        }
      }))
    } as Course;
  }

  async findBySecureId(secureId: string): Promise<Course | null> {
    const course = await db.query.courseTable.findFirst({
      where: eq(courseTable.secureId, secureId),
      with: {
        asParentCourse: {
          with: {
            coveredCourse: true
          }
        }
      }
    });
    
    if (!course) return null;
    
    return {
      secureId: course.secureId,
      title: course.title,
      description: course.description,
      videoUrl: course.videoUrl,
      imageUrl: course.imageUrl,
      level: course.level,
      type: course.type,
      content: course.content,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
      contentCovered: course.asParentCourse.map(cc => ({
        id: cc.id,
        parentCourseId: cc.parentCourseId,
        courseId: cc.courseId,
        course: {
          secureId: cc.coveredCourse.secureId,
          title: cc.coveredCourse.title,
          description: cc.coveredCourse.description,
          videoUrl: cc.coveredCourse.videoUrl,
          imageUrl: cc.coveredCourse.imageUrl,
          level: cc.coveredCourse.level,
          type: cc.coveredCourse.type,
          content: cc.coveredCourse.content,
          createdAt: cc.coveredCourse.createdAt,
          updatedAt: cc.coveredCourse.updatedAt
        }
      }))
    } as Course;
  }

  async create(data: CreateCourseDTO): Promise<Course> {
    const result = await db
      .insert(courseTable)
      .values({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning({
        secureId: courseTable.secureId,
        title: courseTable.title,
        description: courseTable.description,
        videoUrl: courseTable.videoUrl,
        imageUrl: courseTable.imageUrl,
        level: courseTable.level,
        type: courseTable.type,
        content: courseTable.content,
        createdAt: courseTable.createdAt,
        updatedAt: courseTable.updatedAt
      });
    
    return result[0] as Course;
  }

  async updateBySecureId(secureId: string, data: UpdateCourseDTO): Promise<Course> {
    const result = await db
      .update(courseTable)
      .set({
        ...data,
        updatedAt: new Date()
      })
      .where(eq(courseTable.secureId, secureId))
      .returning({
        secureId: courseTable.secureId,
        title: courseTable.title,
        description: courseTable.description,
        videoUrl: courseTable.videoUrl,
        imageUrl: courseTable.imageUrl,
        level: courseTable.level,
        type: courseTable.type,
        content: courseTable.content,
        createdAt: courseTable.createdAt,
        updatedAt: courseTable.updatedAt
      });
    
    return result[0] as Course;
  }

  async deleteBySecureId(secureId: string): Promise<void> {
    // First, delete all content covered relations
    const course = await this.findBySecureId(secureId);
    if (course) {
      await db
        .delete(contentCoveredTable)
        .where(eq(contentCoveredTable.parentCourseId, course.id));
    }

    // Then delete the course
    await db
      .delete(courseTable)
      .where(eq(courseTable.secureId, secureId));
  }
}

export default CourseRepository; 