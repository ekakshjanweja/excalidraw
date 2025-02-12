import { Hono } from "hono";

export const roomRouter = new Hono();

roomRouter.post("/", async (c) => {});
