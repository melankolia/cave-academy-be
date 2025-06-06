import { integer, pgTable, varchar, timestamp, text } from "drizzle-orm/pg-core";
import { usersTable } from "./user";
import { relations } from "drizzle-orm";

export const newsTable = pgTable("news", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  imageUrl: varchar({ length: 2048 }),
  content: text().notNull(),
  description: text().notNull(),
  authorId: integer().notNull().references(() => usersTable.id),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const newsRelations = relations(newsTable, ({ one }) => ({
  author: one(usersTable, {
    fields: [newsTable.authorId],
    references: [usersTable.id],
  }),
})); 