import { Hono } from "hono";
import { signinRouter } from "./signin";
import { signupRouter } from "./signup";

export const authRouter = new Hono();

authRouter.route("/signin", signinRouter);
authRouter.route("/signup", signupRouter);
