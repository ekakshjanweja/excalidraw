import { Context, Next } from "hono";

import { ERROR_TYPE, errorResponse, JWT_SECRET } from "@repo/common";
import { jwt } from "hono/jwt";

export const authMiddleware = async (c: Context, next: Next) => {
  try {
    const authHeader = c.req.header("Authorization");

    if (!authHeader) {
      return c.json(
        errorResponse({
          error: ERROR_TYPE.AUTH_HEADER_NOT_FOUND,
        }),
        401
      );
    }

    const jwtMiddleware = jwt({ secret: JWT_SECRET! });

    return await jwtMiddleware(c, next);
  } catch (error) {
    return c.json(
      errorResponse({
        error: ERROR_TYPE.UNAUTHORIZED,
      }),
      401
    );
  }
};
