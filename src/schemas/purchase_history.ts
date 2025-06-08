import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { studentTable } from "./student";
import { courseTable } from "./course";
import { relations } from "drizzle-orm";

export const purchaseHistoryTable = pgTable("purchase_histories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  studentId: integer().references(() => studentTable.id),
  courseId: integer().references(() => courseTable.id),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const purchaseHistoryRelations = relations(purchaseHistoryTable, ({ one }) => ({
  student: one(studentTable, {
    fields: [purchaseHistoryTable.studentId],
    references: [studentTable.id],
  }),
  course: one(courseTable, {
    fields: [purchaseHistoryTable.courseId],    
    references: [courseTable.id],
  }),
}));