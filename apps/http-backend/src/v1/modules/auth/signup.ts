import { Hono } from "hono";
import { errorResponse, successResponse } from "../../utils/api-response";
import { ERROR_TYPE } from "../../enums/error-type";

export const signupRouter = new Hono();

signupRouter.post("/", async (c) => {
  const body = await c.req.json();

  const email = body.email as string;
  const password = body.password as string;

  const existingUser = "Temporary user"; //DB Call

  if (existingUser) {
    return c.json(errorResponse(ERROR_TYPE.USER_ALREADY_EXISTS), 400);
  }

  // Create a new user in the database
  // Generate a token and return it

  const user = "Temporary user";

  return c.json(successResponse({ user }), 200);
});
