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

export const CreateRoomSchema = z.object({
  slug: z.string(),
});

export const CreateChatSchema: z.ZodType<ChatsInsert> =
  createInsertSchema(chats);

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
