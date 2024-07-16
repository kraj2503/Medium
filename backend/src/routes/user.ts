import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { hashPassword, verifyPassword } from "../hashing";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    console.log("searching user");
    const findUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
      select: {
        id: true,
      },
    });
    if (!findUser) {
      console.log("User not found");
      const password = await hashPassword(body.password);
      console.log("1: Password hashed");
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: password,
          ...(body.name && { name: body.name }),
          // password: password,
        },
      });
      console.log("2: User created");
      const token = await sign({ id: user.id }, c.env.JWT_SECRET);
      console.log("3: Token generated");

      return c.json({
        jwt: token,
      });
    }
  } catch (e: any) {
    return c.status(403);
    // .json({ message: 'Unauthorized' });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    // const inputPassword = await hashPassword(body.password);
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    if (!user) {
      return c.json({ message: "User not found" });
    }

    const verification = await verifyPassword(user.password, body.password);
    console.log(verification);
    if (!verification) {
      return c.json({ message: "Incorrect password" });
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    // localStorage.setItem("token", "Bearer " + token);
    return c.json({ jwt: token });
  } catch (e: any) {
    return c.status(403); //user doesn't exists
  }
});
