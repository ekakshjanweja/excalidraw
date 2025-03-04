import {
  rooms,
  users,
  chats,
  type UserInsert,
  type RoomsInsert,
  type ChatsInsert,
} from "@repo/db";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const CreateUserSchema: z.ZodType<UserInsert> =
  createInsertSchema(users);

export const CreateRoomSchema: z.ZodType<RoomsInsert> =
  createInsertSchema(rooms);

export const CreateChatSchema: z.ZodType<ChatsInsert> =
  createInsertSchema(chats);
