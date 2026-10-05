"use client";

import { useRequiredAuthSession } from "@/features/auth/hooks/use-required-auth-session";

import { AuthSessionProvider } from "../context/auth-session.context";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { session, isLoading } = useRequiredAuthSession();

  if (isLoading || !session) {
    return (
      <main className="grid min-h-dvh place-items-center bg-white">
        <div className="size-10 animate-spin rounded-full border-4 border-[#dbe5ff] border-t-[#2f66e9]" />
      </main>
    );
  }

  return (
    <AuthSessionProvider session={session}>
      {children}
    </AuthSessionProvider>
  );
}
