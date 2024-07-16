import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { hashPassword, verifyPassword } from "../hashing";

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
  if (!jwt) {
    return c.json(
      {
        error: "Unauthorized",
      },
      401
    );
  }
  const token = jwt.split(" ")[1];
  try {
    const verification = (await verify(token, c.env.JWT_SECRET)) as jwtToken;
    if (verification.id) {
      const userId = verification.id;
      c.set("userId", userId);
      await next();
    }
  } catch (err) {
    return c.json(
      {
        error: "Unauthorized",
      },
      401
    );
  }
});

BlogRouter.post("/", async (c) => {
  //   c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  console.log(c.get("userId"));
  const body = await c.req.json();
  console.log(body);
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


BlogRouter.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
try{

    const blog = await prisma.blog.findFirst({
      where: {
        id: body.id,
      },
    });
  
    return c.json({
      blog
    })
}
catch(err){
    return c.json({
        message:"Error while fetching blog post"
    })
}

});


BlogRouter.get('/bulk',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

      const blogs = prisma.blog.findMany({});
      return c.json({
        blogs
      })
})