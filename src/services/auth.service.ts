import { clearAuthToken, setAuthToken } from "@/lib/auth/token";
import { authApi, type AuthResponse } from "@/services/api/auth";

import { authSessionSchema } from "@/lib/auth/schemas/auth.schema";
import { authStorage } from "@/lib/auth/auth.storage";
import type { AuthSession } from "@/lib/auth/types/auth.types";

type LoginInput = {
  email: string;
  password: string;
};

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

async function login(input: LoginInput): Promise<AuthSession> {
  return saveAuthResponse(await authApi.login(input));
}

async function register(input: RegisterInput): Promise<AuthSession> {
  return saveAuthResponse(
    await authApi.register({
      nome: input.name.trim(),
      email: input.email.trim(),
      password: input.password,
    }),
  );
}

function saveAuthResponse(response: AuthResponse): AuthSession {
  const session = authSessionSchema.parse({
    accessToken: response.accessToken,
    refreshToken: response.refreshToken,
    user: {
      id: response.user.id,
      name: response.user.nome,
      email: response.user.email,
      papel: response.user.papel,
    },
  });

  setAuthToken(session.accessToken);
  authStorage.saveSession(session);
  return session;
}

function getValidSession(): AuthSession | null {
  const sessionResult = authSessionSchema.safeParse(authStorage.getSession());

  if (!sessionResult.success || isAccessTokenExpired(sessionResult.data.accessToken)) {
    clearSession();
    return null;
  }

  setAuthToken(sessionResult.data.accessToken);
  return sessionResult.data;
}

async function logout() {
  try {
    await authApi.logout();
  } finally {
    clearSession();
  }
}

function clearSession() {
  clearAuthToken();
  authStorage.clearSession();
}

function isAccessTokenExpired(token: string): boolean {
  try {
    const payload = token.split(".")[1];
    if (!payload) return true;

    const decoded = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/")),
    ) as { exp?: unknown };

    return typeof decoded.exp !== "number" || decoded.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
}

export const authService = {
  login,
  register,
  getValidSession,
  logout,
  clearSession,
};
