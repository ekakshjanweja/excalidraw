import { relations } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { rooms } from "./rooms";
import { chats } from "./chats";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  photo: text("photo").notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  rooms: many(rooms),
  chats: many(chats),
}));

export type UserSelect = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;
