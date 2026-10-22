import { apiFetch } from "@/services/api/client";
import type { SchedulePlan, ScheduleSession } from "@/app/(private)/cronograma/types/schedule.types";

export const scheduleService = {
  getCurrent(): Promise<SchedulePlan> {
    return apiFetch<SchedulePlan>("/cronogramas/atual");
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
