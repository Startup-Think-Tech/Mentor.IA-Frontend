import { apiFetch } from "@/services/api/client";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = LoginPayload & {
  nome: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    nome: string;
    email: string;
    papel: "ALUNO" | "ADMIN";
  };
};

export const authApi = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    return apiFetch<AuthResponse>("/auth/login", {
      method: "POST",
      body: payload,
    });
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    return apiFetch<AuthResponse>("/auth/register", {
      method: "POST",
      body: payload,
    });
  },

  async logout(): Promise<void> {
    await apiFetch<void>("/auth/logout", { method: "POST" });
  },
};
