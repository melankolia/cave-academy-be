import { integer, pgTable, varchar, timestamp, text, boolean } from "drizzle-orm/pg-core";
import { usersTable } from "./user";
import { relations } from "drizzle-orm";

export const eventTable = pgTable("events", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  imageUrl: varchar({ length: 2048 }),
  content: text().notNull(),
  authorId: integer().notNull().references(() => usersTable.id),
  startDate: timestamp().notNull(),
  endDate: timestamp().notNull(),
  level: varchar({ length: 50 }).notNull(),
  isOnline: boolean().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const eventRelations = relations(eventTable, ({ one }) => ({
  author: one(usersTable, {
    fields: [eventTable.authorId],
    references: [usersTable.id],
  }),
}));
