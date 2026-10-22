export type DashboardInsight = {
  id: string;
  job_id: string;
  conteudo: string;
  criado_em: string;
  disciplinas: Array<{
    id: string;
    nome: string;
    codigo: string;
  }>;
};

export type InsightGeneration = {
  job_id: string;
  status: string;
  status_url: string;
};

export type InsightJob = {
  job_id: string;
  status: "pendente" | "processando" | "aguardando_retentativa" | "concluido" | "falhou";
  insight_id: string | null;
};
