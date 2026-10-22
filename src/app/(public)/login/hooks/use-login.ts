"use client";

import { useMutation } from "@tanstack/react-query";

import { authService } from "@/services/auth.service";
import type { LoginInput } from "@/app/(public)/login/types/login.types";

export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginInput) => authService.login(payload),
  });
}
