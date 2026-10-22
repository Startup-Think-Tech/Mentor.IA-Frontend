export type Gap = {
  id: string;
  disciplina: { id: string; nome: string; codigo: string };
  conteudo: { id: string; nome: string };
  desempenho: number;
  pontuacaoGap: number;
  pontuacaoUrgencia: number;
  pontuacaoPrioridade: number;
  nivelPrioridade: string;
};
