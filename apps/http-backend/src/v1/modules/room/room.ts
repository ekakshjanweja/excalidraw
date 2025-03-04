import { Hono } from "hono";
import { db } from "@repo/db";

export const roomRouter = new Hono();

roomRouter.post("/", async (c) => {});
