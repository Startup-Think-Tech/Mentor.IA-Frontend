import { getAuthToken } from "@/lib/auth/token";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1";

const STATUS_MESSAGES: Record<number, string> = {
  400: "Requisição inválida. Verifique os dados informados.",
  401: "Credenciais inválidas ou sessão expirada. Faça login novamente.",
  403: "Você não tem permissão para executar esta ação.",
  404: "Recurso não encontrado.",
  500: "Erro interno do servidor. Tente novamente em instantes.",
};

type ApiErrorPayload = {
  message?: string;
  error?: string;
  [key: string]: unknown;
};

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type ApiFetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  headers?: HeadersInit;
};

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const headers = new Headers(options.headers);

  if (options.body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const authToken = getAuthToken();

  if (authToken) {
    headers.set("Authorization", `Bearer ${authToken}`);
  }

  let response: Response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      body:
        options.body === undefined ? undefined : JSON.stringify(options.body),
      headers,
    });
  } catch {
    throw new ApiError(
      "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.",
      0,
    );
  }

  const payload = await readPayload<ApiErrorPayload | T>(response);

  if (!response.ok) {
    const message =
      extractBackendMessage(payload) ??
      STATUS_MESSAGES[response.status] ??
      "Algo deu errado. Tente novamente.";

    throw new ApiError(message, response.status);
  }

  return payload as T;
}

async function readPayload<T>(
  response: Response,
): Promise<ApiErrorPayload | T> {
  try {
    return (await response.json()) as ApiErrorPayload | T;
  } catch {
    return {} as ApiErrorPayload;
  }
}

function extractBackendMessage(payload: ApiErrorPayload | unknown): string | null {
  if (typeof payload !== "object" || payload === null) {
    return null;
  }

  const candidate = (payload as ApiErrorPayload).message ?? (payload as ApiErrorPayload).error;

  return typeof candidate === "string" && candidate.length > 0
    ? candidate
    : null;
}