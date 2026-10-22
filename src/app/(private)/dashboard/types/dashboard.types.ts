export type DashboardPerformance = {
  id: string;
  disciplina: { id: string; nome: string; codigo: string };
  conteudo: { id: string; nome: string };
  totalQuestoes: number;
  acertos: number;
  percentual: number;
};

export type DashboardStudySession = {
  id: string;
  status: string;
};
