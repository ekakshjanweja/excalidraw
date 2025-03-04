import { pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";
import { chats } from "./chats";

export const rooms = pgTable("rooms", {
  id: serial("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  createdAt: timestamp("created_at").notNull(),
  adminId: uuid("admin_id")
    .notNull()
    .references(() => users.id),
});

export const roomsRelations = relations(rooms, ({ one, many }) => ({
  admin: one(users, {
    fields: [rooms.adminId],
    references: [users.id],
  }),
  chats: many(chats),
}));

export type RoomsSelect = typeof rooms.$inferSelect;
export type RoomsInsert = typeof rooms.$inferInsert;
