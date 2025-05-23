import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const courseTable = pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  secureId: uuid('secureId').defaultRandom(),
  title: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  imageUrl: varchar({ length: 2048 }),
  videoUrl: varchar({ length: 2048 }),
  level: varchar({ length: 50 }).notNull(),
  type: varchar({ length: 50 }).notNull(),
  content: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

// Define relations for the course table
export const courseRelations = relations(courseTable, ({ many }) => ({
    asParentCourse: many(contentCoveredTable, {
      relationName: 'parentCourseRelation',
      fields: [courseTable.id],
      references: [contentCoveredTable.parentCourseId]
    }),
    asCoveredCourse: many(contentCoveredTable, {
      relationName: 'coveredCourseRelation',
      fields: [courseTable.id],
      references: [contentCoveredTable.courseId]
    })
  }));
  

export const contentCoveredTable = pgTable("content_covered", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  parentCourseId: integer('parent_course_id')
    .references(() => courseTable.id),
  courseId: integer('course_id')
    .notNull()
    .references(() => courseTable.id),
});

// Define relations for the content_covered table
export const contentCoveredRelations = relations(contentCoveredTable, ({ one }) => ({
    parentCourse: one(courseTable, {
      relationName: 'parentCourseRelation',
      fields: [contentCoveredTable.parentCourseId],
      references: [courseTable.id]
    }),
    coveredCourse: one(courseTable, {
      relationName: 'coveredCourseRelation',
      fields: [contentCoveredTable.courseId],
      references: [courseTable.id]
    })
  }));

