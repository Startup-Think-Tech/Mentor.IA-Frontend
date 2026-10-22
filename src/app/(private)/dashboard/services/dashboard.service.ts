import { apiFetch } from "@/services/api/client";
import type {
  DashboardPerformance,
  DashboardStudySession,
} from "@/app/(private)/dashboard/types/dashboard.types";

export const dashboardService = {
  getPerformances: () => apiFetch<DashboardPerformance[]>("/diagnosticos/desempenhos"),
  getStudySessions: () => apiFetch<DashboardStudySession[]>("/sessoes-estudo"),
};
