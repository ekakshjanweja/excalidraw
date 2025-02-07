export * from "./schema";

import { drizzle } from "drizzle-orm/node-postgres";
import * as dotenv from "dotenv";
import { schema } from "./schema";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

export const db = drizzle(process.env.DATABASE_URL!, {
  schema: schema,
});
