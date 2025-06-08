import { db } from '../db';
import { sql } from 'drizzle-orm';
import { activeStudentsTable } from '../schemas/active_students';
import { courseTable } from '../schemas/course';

class ActiveStudentsRepository {
  async findAll() {
    try {
      const activeStudents = await db.query.activeStudentsTable.findMany({
        with: {
          student: true,
          course: true,
        }
      });
      return activeStudents;
    } catch (error) {
      throw new Error(`Failed to fetch active students: ${error.message}`);
    }
  }

  async countByCourse() {
    try {
      const counts = await db
        .select({
          courseId: courseTable.id,
          courseTitle: courseTable.title,
          activeStudentCount: sql<number>`count(${activeStudentsTable.id})::int`
        })
        .from(courseTable)
        .leftJoin(
          activeStudentsTable,
          sql`${courseTable.id} = ${activeStudentsTable.courseId} AND ${activeStudentsTable.isActive} = true`
        )
        .groupBy(courseTable.id, courseTable.title);

      return counts;
    } catch (error) {
      throw new Error(`Failed to count active students by course: ${error.message}`);
    }
  }

  async countAll() {
    try {
      const result = await db
        .select({
          count: sql<number>`count(${activeStudentsTable.id})::int`
        })
        .from(activeStudentsTable)
        .where(sql`${activeStudentsTable.isActive} = true`);

      return result[0].count;
    } catch (error) {
      throw new Error(`Failed to count active students: ${error.message}`);
    }
  }
}

export default ActiveStudentsRepository; 