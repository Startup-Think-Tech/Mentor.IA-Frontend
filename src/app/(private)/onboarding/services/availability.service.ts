import { apiFetch } from "@/services/api/client";

export type AvailabilityDay = {
  diaSemana: number;
  minutosDisponiveis: number;
};

export type AvailabilityResponse = {
  disponibilidades: AvailabilityDay[];
  cronogramaPrecisaRecalculo: boolean;
};

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
