import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { newsTable } from "./news";
import { eventTable } from "./event";
import { wikiTable } from "./wiki";
import { purchaseHistoryTable } from "./purchase_history";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  username: varchar({ length: 255 }).notNull().unique(),
  role: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }).notNull(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  news: many(newsTable),
  events: many(eventTable),
  wiki: many(wikiTable),
})); 