import { ApiError, apiFetch } from "@/services/api/client";
import type { DiagnosticQuestion } from "@/app/(private)/diagnostico/types/diagnostic.types";
import type { Diagnostico, DiagnosticoResultado } from "@/app/(private)/diagnostico/types/diagnostico.types";

async function getOrCreateCurrent(): Promise<Diagnostico> {
  try {
    return await apiFetch<Diagnostico>("/diagnosticos/atual");
  } catch (error) {
    if (!(error instanceof ApiError) || error.status !== 404) throw error;
    return apiFetch<Diagnostico>("/diagnosticos", { method: "POST" });
  }
}

export const diagnosticoService = {
  getOrCreateCurrent,

  getQuestions(id: string): Promise<DiagnosticQuestion[]> {
    return apiFetch<DiagnosticQuestion[]>(`/diagnosticos/${id}/questoes`);
  },

  registerAnswers(
    id: string,
    answers: Array<{ questionId: string; alternative: string }>,
  ) {
    return apiFetch(`/diagnosticos/${id}/respostas`, {
      method: "POST",
      body: {
        respostas: answers.map(({ questionId, alternative }) => ({
          diagnosticoQuestaoId: questionId,
          alternativaMarcada: alternative,
        })),
      },
    });
  },

  finalize(id: string): Promise<DiagnosticoResultado> {
    return apiFetch<DiagnosticoResultado>(`/diagnosticos/${id}/finalizar`, {
      method: "POST",
    });
  },
};
