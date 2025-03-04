export * from "./schema/users";
export * from "./schema/rooms";
export * from "./schema/chats";

import { chats } from "./schema/chats";
import { rooms } from "./schema/rooms";
import { users } from "./schema/users";

export const schema = {
  users,
  rooms,
  chats,
};
