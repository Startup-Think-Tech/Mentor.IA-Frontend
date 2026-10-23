import { ApiError, apiFetch } from "@/services/api/client";
import type { SchedulePlan, ScheduleSession } from "@/app/(private)/cronograma/types/schedule.types";

let currentPlanRequest: Promise<SchedulePlan> | null = null;

async function requestCurrentPlan(): Promise<SchedulePlan> {
  try {
    return await apiFetch<SchedulePlan>("/cronogramas/atual");
  } catch (error) {
    if (!(error instanceof ApiError) || error.status !== 404) throw error;

    try {
      return await apiFetch<SchedulePlan>("/cronogramas/gerar", { method: "POST" });
    } catch (generateError) {
      if (!(generateError instanceof ApiError) || generateError.status !== 409) {
        throw generateError;
      }

      return apiFetch<SchedulePlan>("/cronogramas/atual");
    }
  }
}

export const scheduleService = {
  getCurrent(): Promise<SchedulePlan> {
    return apiFetch<SchedulePlan>("/cronogramas/atual");
  },

  getOrCreateCurrent(): Promise<SchedulePlan> {
    if (!currentPlanRequest) {
      currentPlanRequest = requestCurrentPlan().finally(() => {
        currentPlanRequest = null;
      });
    }

    return currentPlanRequest;
  },

  generate(): Promise<SchedulePlan> {
    return apiFetch<SchedulePlan>("/cronogramas/gerar", { method: "POST" });
  },

  completeSession(id: string): Promise<ScheduleSession> {
    return apiFetch<ScheduleSession>(`/sessoes-estudo/${id}/concluir`, {
      method: "POST",
    });
  },
};
