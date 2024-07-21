import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@kshitizraj/medium-common";

export const BlogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();
type jwtToken = {
  id: any;
};

BlogRouter.use("*", async (c, next) => {
  const jwt = c.req.header("authorization") || "";
  // console.log("jwt", jwt);
  const token = jwt.split(" ")[1];
  console.log(token);
  try {
    const verification = (await verify(token, c.env.JWT_SECRET)) as jwtToken;
    console.log(verification);
    if (verification.id) {
      const userId = verification.id;
      c.set("userId", userId);
      await next();
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

BlogRouter.post("/post", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  // console.log(body);
  if (!success) {
    return c.json(
      {
        Messgae: "invalid inputs",
      },
      411
    );
  }
  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      body: body.body,
      authorId: c.get("userId"),
    },
  });
  console.log(blog);
  return c.json({
    id: blog.id,
  });
});
BlogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  // console.log(body);
  if (!success) {
    return c.json(
      {
        Messgae: "invalid inputs",
      },
      411
    );
  }
  const blog = await prisma.blog.update({
    data: {
      title: body.title,
      body: body.body,
    },
    where: {
      id: body.id,
    },
  });
  return c.json({
    id: blog.id,
  });
});

BlogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.blog.findMany({
    select: {
      title: true,
      body: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return c.json({
    blogs,
  });
});
BlogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: c.req.param("id"),
      },
      select: {
        id:true,
        title: true,
        body: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json({
      blog,
    });
  } catch (err) {
    return c.json({
      message: "Error while fetching blog post",
    });
  }
});
