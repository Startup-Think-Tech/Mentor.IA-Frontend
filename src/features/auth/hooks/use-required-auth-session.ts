"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { authService } from "@/features/auth/services/auth.service";
import type { AuthSession } from "@/features/auth/types/auth.types";

type RequiredAuthState = {
  session: AuthSession | null;
  isLoading: boolean;
};

export function useRequiredAuthSession(): RequiredAuthState {
  const router = useRouter();
  const [state, setState] = useState<RequiredAuthState>({
    session: null,
    isLoading: true,
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const currentSession = authService.getValidSession();

      // Permite visualizar telas privadas sem login apenas no servidor de desenvolvimento.
      // Em produção, a autenticação continua obrigatória.
      const devSession =
        process.env.NODE_ENV === "development"
          ? {
              user: { name: "Estudante", email: "dev@mentor.ia" },
              token: "dev-preview-only",
            }
          : null;

      if (!currentSession && !devSession) {
        router.replace("/login");
        return;
      }
      setState({
        session: currentSession ?? devSession,
        isLoading: false,
      });
    }, 0);

    return () => window.clearTimeout(timer);
  }, [router]);

  return state;
}
