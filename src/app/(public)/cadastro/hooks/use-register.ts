"use client";

import { useMutation } from "@tanstack/react-query";

import { authService } from "@/services/auth.service";
import type { RegisterInput } from "@/app/(public)/cadastro/types/register.types";

export function useRegister() {
  return useMutation({
    mutationFn: (payload: Pick<RegisterInput, "name" | "email" | "password">) => authService.register(payload),
  });
}
