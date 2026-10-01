"use client";

import { createContext, useContext } from "react";

import type { AuthSession } from "@/features/auth/types/auth.types";

const AuthSessionContext = createContext<AuthSession | null>(null);

export function AuthSessionProvider({
  session,
  children,
}: {
  session: AuthSession;
  children: React.ReactNode;
}) {
  return (
    <AuthSessionContext.Provider value={session}>
      {children}
    </AuthSessionContext.Provider>
  );
}

export function useAuthSession() {
  const session = useContext(AuthSessionContext);

  if (!session) {
    throw new Error("AuthSessionProvider ausente.");
  }

  return session;
}
