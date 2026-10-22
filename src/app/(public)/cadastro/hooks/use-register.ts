"use client";

import { useMutation } from "@tanstack/react-query";

import { authService } from "@/services/auth.service";
import type { RegisterInput } from "@/app/(public)/cadastro/types/register.types";

type RegisterPayload = Pick<RegisterInput, "name" | "email" | "password">;

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
  });
}
