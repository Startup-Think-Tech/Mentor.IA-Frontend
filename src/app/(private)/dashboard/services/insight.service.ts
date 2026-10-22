import { apiFetch } from "@/services/api/client";
import type {
  DashboardInsight,
  InsightGeneration,
  InsightJob,
} from "@/app/(private)/dashboard/types/insight.types";

export const insightService = {
  getAll: () => apiFetch<DashboardInsight[]>("/insights"),

  getById: (id: string) => apiFetch<DashboardInsight>(`/insights/${id}`),

  getJob: (jobId: string) => apiFetch<InsightJob>(`/insights/jobs/${jobId}`),

  generate: (idempotencyKey: string) =>
    apiFetch<InsightGeneration>("/insights/gerar", {
      method: "POST",
      headers: { "Idempotency-Key": idempotencyKey },
      body: {},
    }),
};
