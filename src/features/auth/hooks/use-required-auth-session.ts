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

      if (!currentSession) {
        router.replace("/login");
        return;
      }
      setState({
        session: currentSession,
        isLoading: false,
      });
    }, 0);

    return () => window.clearTimeout(timer);
  }, [router]);

  return state;
}
