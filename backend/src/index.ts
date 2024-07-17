import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { hashPassword, verifyPassword } from "./hashing";
import { userRouter } from "./routes/user";
import { BlogRouter } from "./routes/blog";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();



app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", BlogRouter);

export default app;