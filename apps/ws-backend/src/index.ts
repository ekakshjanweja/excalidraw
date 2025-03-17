import { ServerWebSocket } from "bun";
import { Hono } from "hono";
import { createBunWebSocket } from "hono/bun";
import { router } from "./v1/routes/router";

const app = new Hono();

const { upgradeWebSocket, websocket } = createBunWebSocket<ServerWebSocket>();

app.route("/api/v1", router);

const server = Bun.serve({
  port: 8888,
  fetch: app.fetch,
  websocket,
});

app.get("/", async (c) => {
  return c.json({ data: { message: "Hello World" } });
});
app.get(
  "/ws",
  upgradeWebSocket((c) => {
    const payload = c.get("jwtPayload");

    return {
      onOpen(_, ws) {
        ws.send("Hello from server!");
      },
      onClose(_, ws) {
        console.log("Connection closed");
      },
      onMessage(event, ws) {
        if (event.data === "ping") {
          ws.send("pong");
        } else {
          ws.send("echo: " + event.data);
        }
      },
    };
  })
);

export default {
  port: 8888,
  fetch: app.fetch,
};
