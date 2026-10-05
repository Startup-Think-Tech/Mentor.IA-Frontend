export type MockUser = {
  name: string;
  email: string;
  password: string;
};

export type AuthSession = {
  user: Omit<MockUser, "password">;
  token: string;
};
