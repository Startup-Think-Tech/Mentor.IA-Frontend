"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authService } from "@/features/auth/services/auth.service";
import type { LoginInput } from "@/features/auth/schemas/login.schema";

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: LoginInput) => authService.login(payload),
    onSuccess: () => {
      router.push("/onboarding");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Não foi possível entrar.",
      );
    },
  });
}
