import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { BlogRouter } from "./routes/blog";
import { cors } from 'hono/cors'
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();


app.use('*', cors())
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", BlogRouter);

export default app;
