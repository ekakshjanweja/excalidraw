import { Hono } from "hono";
import { createBunWebSocket } from "hono/bun";
import type { ServerWebSocket } from "bun";
import { router } from "./routes/router";

const { upgradeWebSocket, websocket } = createBunWebSocket();

const app = new Hono();

const clients = new Set<ServerWebSocket>();

app.route("/api/v1", router);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/ws", async (c) => {
  const upgrade = upgradeWebSocket((c) => {
    let intervalId: Timer;
    return {
      onOpen(_event, ws) {
        intervalId = setInterval(() => {
          ws.send(new Date().toString());
        }, 200);
      },
      onClose() {
        clearInterval(intervalId);
      },
    };
  });

  if (!upgrade) {
    return c.json(
      {
        data: { message: "Upgrade required" },
        status: "error",
      },
      426
    );
  }
});

export default {
  port: 8888,
  fetch: app.fetch,
};
