import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { hashPassword, verifyPassword } from "../hashing";
import { SignupInput, SigninInput } from "@kshitizraj/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();
type jwtToken = {
  id: any;
};

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const { success } = SignupInput.safeParse(body);
    if (!success) {
      return c.json(
        {
          message: "Invalid inputs",
        },
        411
      );
    }

    const findUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
      select: {
        id: true,
      },
    });

    if (findUser) {
      return c.json(
        {
          message: "User already exists",
        },
        409
      );
    } else {
      const password = await hashPassword(body.password);
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: password,
          ...(body.name && { name: body.name }),
        },
      });

      const token = await sign({ id: user.id }, c.env.JWT_SECRET);

      return c.json({
        token,
      });
    }
  } catch (e: any) {
    console.error(e);
    return c.json(
      {
        message: "Internal server error",
      },
      500
    );
  } finally {
    await prisma.$disconnect();
  }
});

userRouter.get("/name", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const jwt = c.req.header("authorization") || "";
    // console.log("jwt", jwt);
    const token = jwt.split(" ")[1];
    console.log(token);

    const verification = (await verify(token, c.env.JWT_SECRET)) as jwtToken;
    console.log(verification);
    if (verification.id) {
      const userId = verification.id;
      const author = await prisma.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          name: true,
        },
      });
      return c.json({
        author
      })
    }
  } catch (err) {
    console.log(err);
    return c.json(
      {
        error: "You are not logged in",
      },
      403
    );
  }
});
