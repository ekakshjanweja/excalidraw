import dotenv from "dotenv";
dotenv.config();

import { Hono } from "hono";
import { router } from "./routes/router";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api/v1", router);

export default {
  port: 8080,
  fetch: app.fetch,
};
