import { boolean, integer, pgTable, timestamp } from "drizzle-orm/pg-core";
import { studentTable } from "./student";
import { courseTable } from "./course";
import { relations } from "drizzle-orm";

export const activeStudentsTable = pgTable("active_students", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    studentId: integer().references(() => studentTable.id).notNull(),
    courseId: integer().references(() => courseTable.id).notNull(),
    isActive: boolean().notNull().default(true),
    createdAt: timestamp().notNull().defaultNow(),
});

export const activeStudentsRelations = relations(activeStudentsTable, ({ one }) => ({
    student: one(studentTable, {
        fields: [activeStudentsTable.studentId],
        references: [studentTable.id],
    }),
    course: one(courseTable, {
        fields: [activeStudentsTable.courseId],
        references: [courseTable.id],
    }),
}));