import type { z } from "zod";

import { getMockUser, setMockUser } from "@/features/auth/mocks/auth.mock";
import {
  authSessionSchema,
  mockUserSchema,
} from "@/features/auth/schemas/auth.schema";
import { loginSchema, type LoginInput } from "@/features/auth/schemas/login.schema";
import { authStorage } from "@/features/auth/storage/auth.storage";
import type { AuthSession, MockUser } from "@/features/auth/types/auth.types";

function getPersistedMockUser(): MockUser | null {
  const currentUser = getMockUser();

  if (currentUser) {
    return currentUser;
  }

  const parsedUser = mockUserSchema.safeParse(authStorage.getMockUser());
  if (!parsedUser.success) {
    return null;
  }

  setMockUser(parsedUser.data);
  return parsedUser.data;
}

async function login(input: LoginInput): Promise<AuthSession> {
  const credentials = loginSchema.parse(input);
  const user = getPersistedMockUser();

  await Promise.resolve();

  if (!user) {
    throw new Error("Nenhum usuário cadastrado no mock.");
  }

  const emailMatches =
    user.email.toLowerCase() === credentials.email.toLowerCase();
  const passwordMatches = user.password === credentials.password;
  if (!emailMatches || !passwordMatches) {
    throw new Error("E-mail ou senha inválidos.");
  }

  const session = authSessionSchema.parse({
    user: { name: user.name, email: user.email },
    token: "mock-token",
  });

  authStorage.saveSession(session);
  return session;
}

function registerMockUser(user: MockUser) {
  const validatedUser = mockUserSchema.parse(user);

  setMockUser(validatedUser);
  authStorage.saveMockUser(validatedUser);
  authStorage.clearSession();
}
function getValidSession(): AuthSession | null {
  const user = getPersistedMockUser();
  const sessionResult = authSessionSchema.safeParse(authStorage.getSession());

  if (!user || !sessionResult.success) {
    authStorage.clearSession();
    return null;
  }

  const session = sessionResult.data;
  const belongsToUser =
    session.user.email.toLowerCase() === user.email.toLowerCase();

  if (!belongsToUser) {
    authStorage.clearSession();
    return null;
  }

  return session;
}

function logout() {
  authStorage.clearSession();
}
async function loginWithBackend(input: LoginInput): Promise<AuthSession> {
  const credentials = loginSchema.parse(input);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL não configurada.");
  }

  const response = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("E-mail ou senha inválidos.");
  }
  const session = authSessionSchema.parse(await response.json());
  authStorage.saveSession(session);

  return session;
}

export const authService = {
  login,
  loginWithBackend,
  registerMockUser,
  getValidSession,
  logout,
};

export type AuthSessionSchema = z.infer<typeof authSessionSchema>;
