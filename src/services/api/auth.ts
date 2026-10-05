import { apiFetch } from "@/services/api/client";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user?: unknown;
};

export const authApi = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    return apiFetch<LoginResponse>("/auth/login", {
      method: "POST",
      body: payload,
    });
  },

  async logout(): Promise<void> {
    await apiFetch<void>("/auth/logout", { method: "POST" });
  },
};