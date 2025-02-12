import { Context, Next } from "hono";

import { errorResponse } from "@repo/common";
import { ERROR_TYPE } from "@repo/common/enums/error_type";
import { jwt } from "hono/jwt";
import { JWT_SECRET } from "@repo/common/config/config";

export const authMiddleware = async (c: Context, next: Next) => {
  try {
    const authHeader = c.req.header("Authorization");

    if (!authHeader) {
      return c.json(errorResponse(ERROR_TYPE.UNAUTHORIZED), 401);
    }

    const jwtMiddleware = jwt({ secret: JWT_SECRET! });

    return await jwtMiddleware(c, next);
  } catch (error) {
    return c.json(errorResponse(ERROR_TYPE.UNAUTHORIZED), 401);
  }
};
