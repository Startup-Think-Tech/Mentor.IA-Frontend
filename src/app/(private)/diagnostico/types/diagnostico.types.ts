export type Diagnostico = {
  id: string;
  status: string;
  totalQuestoes: number;
  criadoEm: string;
  finalizadoEm: string | null;
};

export type DiagnosticoPerformance = {
  disciplina: { id: string; nome: string; codigo: string };
  conteudo: { id: string; nome: string };
  totalQuestoes: number;
  acertos: number;
  percentual: number;
};

export type DiagnosticoResultado = {
  diagnosticoId: string;
  status: string;
  totalQuestoes: number;
  totalAcertos: number;
  percentualGeral: number;
  finalizadoEm: string;
  desempenhos: DiagnosticoPerformance[];
};

export type DiagnosticoQuizState = {
  questions: import("./diagnostic.types").DiagnosticQuestion[];
  currentIndex: number;
  selectedAlternative: string | null;
  diagnosticoId: string | null;
  result: DiagnosticoResultado | null;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  isComplete: boolean;
};
