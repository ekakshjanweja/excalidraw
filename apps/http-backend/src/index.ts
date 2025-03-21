import dotenv from "dotenv";
import { Hono } from "hono";
import { router } from "./v1/routes/router";
import { API_BASE, loadEnv } from "@repo/common";
import { authMiddleware } from "./v1/middlewares/auth";

dotenv.config();
loadEnv();

const app = new Hono();

app.use(`${API_BASE}/*`, authMiddleware);

app.route(API_BASE, router);

export default {
  port: 8080,
  fetch: app.fetch,
};
