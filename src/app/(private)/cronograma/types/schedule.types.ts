export type ScheduleSession = {
  id: string;
  tipo: string;
  status: string;
  agendadoPara: string;
  duracaoMinutos: number;
  revisaoId: string | null;
  disciplina: { id: string; nome: string; codigo: string };
  conteudo: { id: string; nome: string };
};

export type SchedulePlan = {
  id: string;
  status: string;
  validoAPartir: string;
  validoAte: string;
  geradoEm: string;
  totalSessoes: number;
  sessoes: ScheduleSession[];
};

export type WeeklyScheduleProps = {
  plan: SchedulePlan;
  onSessionCompleted: (sessionId: string) => void;
};
