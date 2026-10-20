import { z } from "zod";

export const authSessionSchema = z.object({
  user: z.object({
    id: z.string().uuid(),
    name: z.string().trim().min(1),
    email: z.string().trim().email(),
    papel: z.enum(["ALUNO", "ADMIN"]),
  }),
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
});
