import { NotFoundError } from '../utils/errors';
import {CourseRepository} from '../repositories/course';
import { ContentCovered, Course, ParentContentCovered } from '../models/course.dto';


class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {}

  async findAll(): Promise<Object[]> {
    return await this.courseRepository.findAll();
  }

  async findById(id: number): Promise<Object> {
    const course = await this.courseRepository.findById(id);
    if (!course) {
      throw new NotFoundError(`Course with id ${id} not found`);
    }
    return course;
  }

  async create(course: Course): Promise<Object> {

    const resultCourse: any = await this.courseRepository.create(course);

    course.contentCovered.map((contentCovered) => {
      if (contentCovered.type === "PARENT") contentCovered.courseId = resultCourse.id;
      contentCovered.parentCourseId = resultCourse.id;
    });
    const resultContentCovered: any = await this.courseRepository.createContentCovered(course.contentCovered);

    const parentContentCovered: ParentContentCovered = course.contentCovered.find((contentCovered) => contentCovered.type === "PARENT") as ParentContentCovered;
    const parentContentCoveredId = resultContentCovered.find((contentCovered) => contentCovered.type === "PARENT")?.id;
    const resultSubContent: any = await this.courseRepository.createSubContent(parentContentCovered.subContents, parentContentCoveredId);

    const payloadSubCourse: any = [];
    resultSubContent.forEach((subContent, index) => {
      parentContentCovered.subContents[index].subCourses.forEach((subCourse) => {
        payloadSubCourse.push({
          subContentId: subContent.id,
          title: subCourse.title,
          description: subCourse.description,
        })
      })
    })

    await this.courseRepository.createSubCourse(payloadSubCourse);

    return resultCourse
  }

  async update(id: number, course: Partial<Course>): Promise<Object> {
    // Check if course exists
    const existingCourse = await this.courseRepository.findById(id);
    if (!existingCourse) {
      throw new NotFoundError(`Course with id ${id} not found`);
    }

    // Update main course information
    const updatedCourse = await this.courseRepository.update(id, course);

    // If content covered is provided, update it
    if (course.contentCovered) {
      // Delete existing content covered and its related entities
      await this.courseRepository.deleteContentCovered(id);

      // Create new content covered
      const contentCovered = course.contentCovered.map(cc => ({
        ...cc,
        parentCourseId: id,
        courseId: cc.type === "PARENT" ? id : cc.courseId
      }));

      const resultContentCovered: any = await this.courseRepository.createContentCovered(contentCovered);

      // Handle parent content covered and its sub-content
      const parentContentCovered = course.contentCovered.find(cc => cc.type === "PARENT") as ParentContentCovered;

      console.log({parentContentCovered});
      if (parentContentCovered?.subContents) {
        const parentContentCoveredId = resultContentCovered.find(cc => cc.type === "PARENT")?.id;
        const resultSubContent: any = await this.courseRepository.createSubContent(
          parentContentCovered.subContents, 
          parentContentCoveredId
        );

        // Handle sub-courses
        const payloadSubCourse = [];
        resultSubContent.forEach((subContent, index) => {
          const subCourses = parentContentCovered.subContents[index].subCourses;
          if (subCourses) {
            subCourses.forEach(subCourse => {
              payloadSubCourse.push({
                subContentId: subContent.id,
                title: subCourse.title,
                description: subCourse.description,
              });
            });
          }
        });

        console.log({payloadSubCourse});

        if (payloadSubCourse.length > 0) {
          await this.courseRepository.createSubCourse(payloadSubCourse);
        }
      }
    }

    return updatedCourse;
  }

  async deleteCourse(id: number): Promise<void> {
    try {
      await this.courseRepository.delete(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error("Failed to delete course");
    }
  }
}

export default CourseService;