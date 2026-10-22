import { apiFetch } from "@/services/api/client";
import type { Performance, StudySession } from "@/app/(private)/desempenho/types/performance.types";

export const performanceService = {
  getCurrent: () => apiFetch<Performance[]>("/diagnosticos/desempenhos"),
  getSessions: () => apiFetch<StudySession[]>("/sessoes-estudo"),
};
