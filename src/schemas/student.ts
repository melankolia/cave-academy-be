import { relations } from "drizzle-orm";
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { purchaseHistoryTable } from "./purchase_history";
import { activeStudentsTable } from "./active_students";

export const studentTable = pgTable("students", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const studentRelations = relations(studentTable, ({ many }) => ({
  purchaseHistories: many(purchaseHistoryTable),
  activeStudents: many(activeStudentsTable),
}));

