import { db, users } from "@repo/db";
import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { CreateUserSchema } from "@repo/common/types";
import { ERROR_TYPE, errorResponse, successResponse } from "@repo/common";

export const signupRouter = new Hono();

signupRouter.post("/", async (c) => {
  const body = await c.req.json();

  const safeParse = CreateUserSchema.safeParse(body);

  if (!safeParse.success) {
    return c.json(errorResponse(ERROR_TYPE.INVALID_REQUEST), 400);
  }

  const existingUser = (
    await db.select().from(users).where(eq(users.email, safeParse.data.email))
  )[0];

  if (existingUser) {
    return c.json(errorResponse(ERROR_TYPE.USER_ALREADY_EXISTS), 400);
  }

  try {
    const user = (await db.insert(users).values(safeParse.data).returning())[0];

    if (!user) {
      return c.json(
        errorResponse(
          ERROR_TYPE.INTERNAL_SERVER_ERROR,
          "User not found! Error creating a new user"
        ),
        500
      );
    }

    return c.json(successResponse({ user }), 200);
  } catch (error) {
    return c.json(
      errorResponse(ERROR_TYPE.INTERNAL_SERVER_ERROR, error as string),
      500
    );
  }
});
