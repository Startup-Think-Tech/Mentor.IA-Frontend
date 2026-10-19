export type AuthUser = {
  id: string;
  name: string;
  email: string;
  papel: "ALUNO" | "ADMIN";
};

export type AuthSession = {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
};
