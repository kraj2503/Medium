import z from "zod";

export const SignupInput = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
  about: z.string().optional(),
});

export const SigninInput = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const createBlogInput = z.object({
  title: z.string(),
  body: z.string(),
});
export const updateBlogInput = z.object({
  title: z.string(),
  body: z.string(),
  id: z.string(),
});

//Type inference in zod
export type SignupInput = z.infer<typeof SignupInput>;

export type SigninInput = z.infer<typeof SigninInput>;

export type createBlogInput = z.infer<typeof createBlogInput>;

export type updateBlogInput = z.infer<typeof updateBlogInput>;
