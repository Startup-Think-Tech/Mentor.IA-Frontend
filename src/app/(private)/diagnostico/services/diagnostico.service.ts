import { ApiError, apiFetch } from "@/services/api/client";
import type { DiagnosticQuestionRef } from "@/app/(private)/diagnostico/types/diagnostic.types";
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

  getQuestions(id: string): Promise<DiagnosticQuestionRef[]> {
    return apiFetch<DiagnosticQuestionRef[]>(`/diagnosticos/${id}/questoes`);
  },

  registerAnswer(id: string, questionId: string, alternative: string, isCorrect: boolean) {
    return apiFetch(`/diagnosticos/${id}/respostas`, {
      method: "POST",
      body: {
        respostas: [{
          diagnosticoQuestaoId: questionId,
          alternativaMarcada: alternative,
          acertoInformado: isCorrect,
        }],
      },
    });
  },

  finalize(id: string): Promise<DiagnosticoResultado> {
    return apiFetch<DiagnosticoResultado>(`/diagnosticos/${id}/finalizar`, {
      method: "POST",
    });
  },
};
