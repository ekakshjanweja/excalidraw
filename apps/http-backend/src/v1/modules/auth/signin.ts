import { ERROR_TYPE, errorResponse, successResponse } from "@repo/common";
import { db, users } from "@repo/db";
import { Hono } from "hono";
import { eq } from "drizzle-orm";

export const signinRouter = new Hono();

signinRouter.post("/", async (c) => {
  const body = await c.req.json();

  const email = body.email as string;
  const password = body.password as string;

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (!existingUser) {
    return c.json(errorResponse(ERROR_TYPE.USER_NOT_FOUND), 404);
  }

  const user = "Temporary user";

  return c.json(successResponse({ user }), 200);
});
