import { integer, pgTable, serial, text, uuid } from "drizzle-orm/pg-core";
import { rooms } from "./rooms";
import { users } from "./users";
import { relations } from "drizzle-orm";

export const chats = pgTable("chats", {
  id: serial("id").primaryKey(),
  roomId: integer("room_id")
    .notNull()
    .references(() => rooms.id),
  message: text("message").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
});

export const chatsRelations = relations(chats, ({ one }) => ({
  room: one(rooms, {
    fields: [chats.roomId],
    references: [rooms.id],
  }),
  user: one(users, {
    fields: [chats.userId],
    references: [users.id],
  }),
}));
