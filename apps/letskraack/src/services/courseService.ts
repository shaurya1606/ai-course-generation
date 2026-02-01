import { db } from '@/config/db';
import { coursesTable } from '@/config/schema';
import { desc, ilike, or, eq } from 'drizzle-orm';

export class CourseService {
  /**
   * Get all courses for explore page with optional search
   */
  static async getAllCourses(searchQuery?: string) {
    let query: any = db.select().from(coursesTable);

    if (searchQuery && searchQuery.trim()) {
      const searchTerm = `%${searchQuery.trim()}%`;
      query = query.where(
        or(
          ilike(coursesTable.title, searchTerm),
          ilike(coursesTable.description, searchTerm),
          ilike(coursesTable.category, searchTerm)
        )
      );
    }

    query = query.orderBy(desc(coursesTable.id));

    const courses = await query;
    return courses;
  }

  /**
   * Get course by ID
   */
  static async getCourseById(courseId: string) {
    const course = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.cid, courseId))
      .limit(1);

    return course[0] || null;
  }

  /**
   * Get courses by user email
   */
  static async getCoursesByUser(userEmail: string) {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.userEmail, userEmail))
      .orderBy(desc(coursesTable.id));

    return courses;
  }
}