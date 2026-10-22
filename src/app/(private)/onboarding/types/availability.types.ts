export type AvailabilityDay = {
  diaSemana: number;
  minutosDisponiveis: number;
};

export type AvailabilityResponse = {
  disponibilidades: AvailabilityDay[];
  cronogramaPrecisaRecalculo: boolean;
};
