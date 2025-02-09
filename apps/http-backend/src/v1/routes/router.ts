import { Hono } from "hono";
import { authRouter } from "../modules/auth/auth";

export const router = new Hono();

router.route("/auth", authRouter);
