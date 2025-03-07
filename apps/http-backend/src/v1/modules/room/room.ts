import { Hono } from "hono";
import { db } from "@repo/db";
import { CreateRoomSchema } from "@repo/common/types";
import { ERROR_TYPE, errorResponse } from "@repo/common";

export const roomRouter = new Hono();

roomRouter.post("/", async (c) => {
  const body = await c.req.json();

  const safeParse = CreateRoomSchema.safeParse(body);

  if (!safeParse.success) {
    return c.json(
      errorResponse({
        error: ERROR_TYPE.INVALID_REQUEST,
      }),
      400
    );
  }

  
});
