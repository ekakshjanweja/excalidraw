import { Hono } from "hono";
import { errorResponse, successResponse } from "../../utils/api-response";
import { ERROR_TYPE } from "../../enums/error-type";

export const signinRouter = new Hono();

signinRouter.post("/", async (c) => {
  const body = await c.req.json();

  const email = body.email as string;
  const password = body.password as string;

  const existingUser = "Temporary user"; //DB Call

  if (!existingUser) {
    return c.json(errorResponse(ERROR_TYPE.USER_NOT_FOUND), 404);
  }

  const user = "Temporary user";

  return c.json(successResponse({ user }), 200);
});
