import { Context, Next } from "hono";
import { jwt } from "hono/jwt";
import { API_BASE, JWT_SECRET } from "@repo/common/config/config";
import { errorResponse } from "@repo/common";
import { ERROR_TYPE } from "@repo/common/enums/error_type";

export const authMiddleware = async (c: Context, next: Next) => {
  if (c.req.path.startsWith(`${API_BASE}/auth`)) {
    return next();
  }

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
