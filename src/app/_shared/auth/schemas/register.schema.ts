import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().trim().min(3, "Informe seu nome completo."),
    email: z
      .string()
      .trim()
      .min(1, "Informe seu e-mail.")
      .email("Informe um e-mail válido."),
    password: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres."),
    confirmPassword: z.string().min(1, "Confirme sua senha."),
    acceptedTerms: z
      .boolean()
      .refine((value) => value, "Você precisa aceitar os termos."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
