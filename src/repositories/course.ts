import { eq } from "drizzle-orm";
import { db } from "../db";
import { contentCoveredTable, courseTable, subContentTable, subCourseTable } from "../schemas/course";
import { ContentCovered, Course, SubContentCovered, SubCourse } from "../models/course.dto";
import { NotFoundError } from "../utils/errors";

class CourseRepository {
  public async findAll(): Promise<Object[]> {
    return await db.query.courseTable.findMany();
  }

  public async findById(id: number): Promise<Object> {
    const course = await db.query.courseTable.findFirst({ 
      where: eq(courseTable.id, id),
      with: {
        contentCovered: {
          with: {
            courses: true
          }
        }
      },
    });

    if (!course) {
      throw new NotFoundError(`Course with id ${id} not found`);
    }

    for (let i = 0; i < course.contentCovered.length; i++) {
      if (course.contentCovered[i].type == "PARENT") {
        const subContent = await db.query.subContentTable.findMany({
          where: eq(subContentTable.contentCoveredId, course.contentCovered[i].id),
          with: {
            subCourses: true
          }
        });

        course.contentCovered[i] = {
          ...course.contentCovered[i],
          subContents: subContent
        }
      }
    }

    return course;
  }

  public async findByLevel(level: string): Promise<Object[]> {
    return await db.query.courseTable.findMany({
      where: eq(courseTable.level, level),
      with: {
        contentCovered: {
          with: {
            course: true
          }
        },
      },
    });
  }

  public async findByType(type: string): Promise<Object[]> {
    return await db.query.courseTable.findMany({
      where: eq(courseTable.type, type),
      with: {
        contentCovered: {
          with: {
            course: true
          }
        },
      },
    });
  }

  public async create(course: Course): Promise<Object> {

    const payloadCourse = {
      title: course.title,
      description: course.description,
      imageUrl: course.imageUrl,
      videoUrl: course.videoUrl,
      level: course.level,
      type: course.type,
      content: course.content,
      startDate: new Date(course.startDate),
      endDate: new Date(course.endDate),
    }
    const [result] = await db.insert(courseTable).values(payloadCourse).returning();
    return result;
  }

  public async createContentCovered(contentCovered: ContentCovered[]): Promise<Object> {
    const payloadContentCovered = contentCovered.map((contentCovered) => {
      return {
        parentCourseId: contentCovered.parentCourseId,
        courseId: contentCovered.courseId,
        level:  contentCovered.level,
        type: contentCovered.type as "PARENT" | "CHILDREN",
      }
    });
    
    return await db.insert(contentCoveredTable).values(payloadContentCovered).returning();
  }

  public async createSubContent(subContent: SubContentCovered[], contentCoveredId: number): Promise<Object> {
    const payloadSubContent = subContent.map((subContent) => {
      return {
        contentCoveredId: contentCoveredId,
        number: subContent.number,
        title: subContent.title,
        description: subContent.description,
      }
    });

    return await db.insert(subContentTable).values(payloadSubContent).returning();
  }

  public async createSubCourse(subCourse: SubCourse[]): Promise<Object> {
    return await db.insert(subCourseTable).values(subCourse).returning();
  }

  public async update(id: number, course: Partial<Course>): Promise<Object> {
    const payloadCourse = {
      title: course.title,
      description: course.description,
      imageUrl: course.imageUrl,
      videoUrl: course.videoUrl,
      level: course.level,
      type: course.type,
      content: course.content,
      startDate: course.startDate ? new Date(course.startDate) : undefined,
      endDate: course.endDate ? new Date(course.endDate) : undefined,
      updatedAt: new Date(),
    };

    // Remove undefined values
    Object.keys(payloadCourse).forEach(key => payloadCourse[key] === undefined && delete payloadCourse[key]);

    const [result] = await db
      .update(courseTable)
      .set(payloadCourse)
      .where(eq(courseTable.id, id))
      .returning();
    
    return result;
  }

  public async updateContentCovered(id: number, contentCovered: Partial<ContentCovered>): Promise<Object> {
    const [result] = await db
      .update(contentCoveredTable)
      .set(contentCovered)
      .where(eq(contentCoveredTable.id, id))
      .returning();
    
    return result;
  }

  public async updateSubContent(id: number, subContent: Partial<SubContentCovered>): Promise<Object> {
    const [result] = await db
      .update(subContentTable)
      .set(subContent)
      .where(eq(subContentTable.id, id))
      .returning();
    
    return result;
  }

  public async updateSubCourse(id: number, subCourse: Partial<SubCourse>): Promise<Object> {
    const [result] = await db
      .update(subCourseTable)
      .set(subCourse)
      .where(eq(subCourseTable.id, id))
      .returning();
    
    return result;
  }

  public async deleteSubCourse(subContentId: number): Promise<void> {
    await db
      .delete(subCourseTable)
      .where(eq(subCourseTable.subContentId, subContentId));
  }

  public async deleteSubContent(contentCoveredId: number): Promise<void> {
    // First get all sub_contents for this content_covered
    const subContents = await db.query.subContentTable.findMany({
      where: eq(subContentTable.contentCoveredId, contentCoveredId)
    });

    // Delete all related sub_courses first
    for (const subContent of subContents) {
      await this.deleteSubCourse(subContent.id);
    }

    // Then delete the sub_contents
    await db
      .delete(subContentTable)
      .where(eq(subContentTable.contentCoveredId, contentCoveredId));
  }

  public async deleteContentCovered(courseId: number): Promise<void> {
    // First get all content_covered entries for this course
    const contentCovered = await db.query.contentCoveredTable.findMany({
      where: eq(contentCoveredTable.parentCourseId, courseId)
    });

    // Delete all related sub_content and sub_courses first
    for (const content of contentCovered) {
      await this.deleteSubContent(content.id);
    }

    // Then delete the content_covered entries
    await db
      .delete(contentCoveredTable)
      .where(eq(contentCoveredTable.parentCourseId, courseId));
  }

  public async delete(id: number): Promise<void> {
    // First check if course exists
    const course = await db.query.courseTable.findFirst({
      where: eq(courseTable.id, id)
    });

    if (!course) {
      throw new NotFoundError(`Course with id ${id} not found`);
    }

    // Delete all related content_covered, sub_content, and sub_courses first
    await this.deleteContentCovered(id);

    // Finally delete the course
    await db
      .delete(courseTable)
      .where(eq(courseTable.id, id));
  }
}

export { CourseRepository }; 