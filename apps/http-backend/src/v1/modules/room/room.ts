import { Hono } from "hono";
import { db, rooms } from "@repo/db";
import { CreateRoomSchema } from "@repo/common/types";
import { ERROR_TYPE, errorResponse, successResponse } from "@repo/common";
import { eq } from "drizzle-orm";

export const roomRouter = new Hono();

roomRouter.post("/", async (c) => {
  const body = await c.req.json();
  const payload = c.get("jwtPayload");

  const userId = payload.sub;

  const safeParse = CreateRoomSchema.safeParse(body);

  if (!safeParse.success) {
    return c.json(
      errorResponse({
        error: ERROR_TYPE.INVALID_REQUEST,
      }),
      400
    );
  }

  const slug = safeParse.data.slug;
  try {
    const existingRoom = (
      await db.select().from(rooms).where(eq(rooms.slug, slug))
    )[0];

    if (existingRoom) {
      return c.json(
        errorResponse({
          error: ERROR_TYPE.ROOM_ALREADY_EXISTS,
        }),
        400
      );
    }

    const newRoom = (
      await db
        .insert(rooms)
        .values({
          slug,
          adminId: userId,
        })
        .returning()
    )[0];

    if (!newRoom) {
      return c.json(
        errorResponse({
          error: ERROR_TYPE.UNKNOWN_ERROR,
          message: "Failed to create room",
        }),
        500
      );
    }

    return c.json(successResponse({ room: newRoom }), 200);
  } catch (error) {
    return c.json(
      errorResponse({
        error: ERROR_TYPE.INTERNAL_SERVER_ERROR,
        message: `$error`,
      }),
      500
    );
  }
});
