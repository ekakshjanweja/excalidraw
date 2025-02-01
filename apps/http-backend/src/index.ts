import { Hono } from "hono";

import dotenv from "dotenv";
import { router } from "./routes/router";
dotenv.config();

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api/v1", router);

export default {
  port: 8080,
  fetch: app.fetch,
};
