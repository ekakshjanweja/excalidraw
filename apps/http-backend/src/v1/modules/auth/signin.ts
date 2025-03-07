import {
  ERROR_TYPE,
  errorResponse,
  JWT_SECRET,
  successResponse,
} from "@repo/common";
import { db, users } from "@repo/db";
import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { SignInSchema } from "@repo/common/types";
import { sign } from "hono/jwt";

export const signinRouter = new Hono();

signinRouter.post("/", async (c) => {
  const body = await c.req.json();

  const safeParse = SignInSchema.safeParse(body);

  if (!safeParse.success) {
    return c.json(errorResponse(ERROR_TYPE.INVALID_REQUEST), 400);
  }

  const existingUser = (
    await db.select().from(users).where(eq(users.email, safeParse.data.email))
  )[0];

  if (!existingUser) {
    return c.json(errorResponse(ERROR_TYPE.USER_NOT_FOUND), 404);
  }

  const payload = {
    sub: existingUser.id,
    role: "user",
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };

  const token = await sign(payload, JWT_SECRET!);

  return c.json(
    successResponse({
      message: "User signed in successfully",
      token,
    }),
    200
  );
});
