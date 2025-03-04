import { errorResponse, successResponse } from "@repo/common";
import { ERROR_TYPE } from "@repo/common/enums/error_type";
import { db, users } from "@repo/db";
import { Hono } from "hono";
import { eq } from "drizzle-orm";

export const signupRouter = new Hono();

signupRouter.post("/", async (c) => {
  const body = await c.req.json();

  const email = body.email as string;
  const password = body.password as string;

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (existingUser) {
    return c.json(errorResponse(ERROR_TYPE.USER_ALREADY_EXISTS), 400);
  }

  // Create a new user in the database
  // Generate a token and return it

  const user = "Temporary user";

  return c.json(successResponse({ user }), 200);
});
