import type { AuthSession } from "@/lib/auth/types/auth.types";

const SESSION_KEY = "mentor.ia.session";

function getLocalStorage() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
}

function readJson(key: string): unknown | null {
  const storage = getLocalStorage();
  if (!storage) return null;

  const value = storage.getItem(key);
  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch {
    storage.removeItem(key);
    return null;
  }
}

export const authStorage = {
  getSession(): unknown | null {
    return readJson(SESSION_KEY);
  },

  saveSession(session: AuthSession) {
    getLocalStorage()?.setItem(SESSION_KEY, JSON.stringify(session));
  },

  clearSession() {
    getLocalStorage()?.removeItem(SESSION_KEY);
  },
};
