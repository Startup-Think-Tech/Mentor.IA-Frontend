import type { MockUser } from "@/features/auth/types/auth.types";

export let mockUser: MockUser | null = null;

export function setMockUser(user: MockUser) {
  mockUser = user;
}

export function getMockUser() {
  return mockUser;
}
