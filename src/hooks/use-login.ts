"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { setAuthToken } from "@/lib/auth/token";
import { authApi, type LoginPayload } from "@/services/api/auth";

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: (data) => {
      setAuthToken(data.token);
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Não foi possível entrar.",
      );
    },
  });
}