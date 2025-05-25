import { relations } from "drizzle-orm";
import { integer, PgColumn, pgTable, PgTableWithColumns, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./user";

export const wikiTable = pgTable("wiki", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  thumbnailUrl: varchar({ length: 2048 }).notNull(),
  imageUrl: varchar({ length: 2048 }).notNull(),
  content: text().notNull(),
  userId: integer().references(() => usersTable.id),
  topicId: integer().references(() => topicTable.id),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

export const topicTable = pgTable("topic", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
});

export const topicRelations = relations(topicTable, ({ many }) => ({
  wiki: many(wikiTable),
}));

export const wikiRelations = relations(wikiTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [wikiTable.userId],
    references: [usersTable.id],
  }),
  topic: one(topicTable, {
    fields: [wikiTable.topicId],
    references: [topicTable.id],
  }),
}));