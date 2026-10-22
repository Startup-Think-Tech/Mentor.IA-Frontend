import { apiFetch } from "@/services/api/client";
import type { AvailabilityDay, AvailabilityResponse } from "@/app/(private)/onboarding/types/availability.types";

export const availabilityService = {
  getMine(): Promise<AvailabilityDay[]> {
    return apiFetch<AvailabilityDay[]>("/alunos/me/disponibilidade");
  },

  replaceMine(disponibilidades: AvailabilityDay[]): Promise<AvailabilityResponse> {
    return apiFetch<AvailabilityResponse>("/alunos/me/disponibilidade", {
      method: "PUT",
      body: { disponibilidades },
    });
  },
};
