import { z } from "zod";

export const mockUserSchema = z.object({
  name: z.string().trim().min(3),
  email: z.string().trim().email(),
  password: z.string().min(8),
});

export const authSessionSchema = z.object({
  user: z.object({
    name: z.string().trim().min(1),
    email: z.string().trim().email(),
  }),
  token: z.string().min(1),
});
