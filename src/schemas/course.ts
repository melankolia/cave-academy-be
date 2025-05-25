import { relations } from "drizzle-orm";
import { integer, PgColumn, pgTable, PgTableWithColumns, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const courseTable = pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  imageUrl: varchar({ length: 2048 }),
  videoUrl: varchar({ length: 2048 }),
  level: varchar({ length: 50 }).notNull(),
  type: varchar({ length: 50 }).notNull(),
  content: text().notNull(),
  startDate: timestamp().notNull(),
  endDate: timestamp().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const subContentTable = pgTable("sub_contents", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  contentCoveredId: integer().references(() => contentCoveredTable.id),
  title: varchar({ length: 255 }).notNull(),
  number: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
});

export const subCourseTable = pgTable("sub_courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  subContentId: integer().references(() => subContentTable.id),
  title: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
});

export const contentCoveredTable = pgTable("content_covered", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  parentCourseId: integer().references(() => courseTable.id),
  courseId: integer().notNull().references(() => courseTable.id),
  level: integer().notNull(),
  type: varchar({ length: 50 }).notNull().$type<'PARENT' | 'CHILDREN'>().default('CHILDREN'),
});

export const courseRelations = relations(courseTable, ({ many, one }) => ({
    contentCovered: many(contentCoveredTable, {
      relationName: "course",
    }),
    parentContentCovered: one(contentCoveredTable, {
      fields: [courseTable.id],
      references: [contentCoveredTable.courseId],
      relationName: "courses",
    }),
  }));

export const contentCoveredRelations = relations(contentCoveredTable, ({ many, one }) => ({
  course: one(courseTable, {
    fields: [contentCoveredTable.parentCourseId],
    references: [courseTable.id],
    relationName: 'course',
  }),
  courses: one(courseTable, {
    fields: [contentCoveredTable.courseId], 
    references: [courseTable.id],
    relationName: 'courses',
  }),
  subContent: many(subContentTable, {
    relationName: 'contentCovered'
  }),
}));

export const subContentRelations = relations(subContentTable, ({ many,one }) => ({
  subCourses: many(subCourseTable),
  contentCovered: one(contentCoveredTable, {
    fields: [subContentTable.contentCoveredId],
    references: [contentCoveredTable.id],
  }),
}))

export const subCourseRelations = relations(subCourseTable, ({ one }) => ({
  subContent: one(subContentTable, {
    fields: [subCourseTable.subContentId],
    references: [subContentTable.id]
  }),
}))
