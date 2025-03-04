import { errorResponse, successResponse } from "@repo/common";
import { ERROR_TYPE } from "@repo/common/enums/error_type";
import { Hono } from "hono";

export const signinRouter = new Hono();

signinRouter.post("/", async (c) => {
  const body = await c.req.json();

  const email = body.email as string;
  const password = body.password as string;

  const existingUser = "Temporary user"; 

  if (!existingUser) {
    return c.json(errorResponse(ERROR_TYPE.USER_NOT_FOUND), 404);
  }

  const user = "Temporary user";

  return c.json(successResponse({ user }), 200);
});
