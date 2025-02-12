import { Context, Next } from "hono";
import { API_BASE, JWT_SECRET } from "../config/config";
import { errorResponse } from "../v1/utils/api-response";
import { ERROR_TYPE } from "../v1/enums/error-type";
import { jwt } from "hono/jwt";

export const authMiddleware = async (c: Context, next: Next) => {
  if (c.req.path.startsWith(`${API_BASE}/auth`)) {
    return next();
  }

  try {
    const authHeader = c.req.header("Authorization");

    if (!authHeader) {
      return c.json(errorResponse(ERROR_TYPE.UNAUTHORIZED), 401);
    }

    const jwtMiddleware = jwt({
      secret: JWT_SECRET!,
    });

    return await jwtMiddleware(c, next);
  } catch (error) {
    return c.json(errorResponse(ERROR_TYPE.UNAUTHORIZED), 401);
  }
};
