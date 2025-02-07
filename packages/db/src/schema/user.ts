import { relations } from "drizzle-orm";
import { pgTable, uuid } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: uuid("id").defaultRandom(),
});

export const userRelations = relations(user, ({}) => ({}));

export type UserSelect = typeof user.$inferSelect;
export type UserInsert = typeof user.$inferInsert;
