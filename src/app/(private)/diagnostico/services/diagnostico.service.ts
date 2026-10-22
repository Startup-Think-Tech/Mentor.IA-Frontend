import { ApiError, apiFetch } from "@/services/api/client";
import type { DiagnosticQuestion } from "@/app/(private)/diagnostico/types/diagnostic.types";
import type { Diagnostico, DiagnosticoResultado } from "@/app/(private)/diagnostico/types/diagnostico.types";

let currentDiagnosticRequest: Promise<Diagnostico> | null = null;

async function requestCurrentDiagnostic(): Promise<Diagnostico> {
  try {
    return await apiFetch<Diagnostico>("/diagnosticos/atual");
  } catch (error) {
    if (!(error instanceof ApiError) || error.status !== 404) throw error;

    try {
      return await apiFetch<Diagnostico>("/diagnosticos", { method: "POST" });
    } catch (createError) {
      if (!(createError instanceof ApiError) || createError.status !== 409) {
        throw createError;
      }

      return apiFetch<Diagnostico>("/diagnosticos/atual");
    }
  }
}

function getOrCreateCurrent(): Promise<Diagnostico> {
  if (!currentDiagnosticRequest) {
    currentDiagnosticRequest = requestCurrentDiagnostic().finally(() => {
      currentDiagnosticRequest = null;
    });
  }

  return currentDiagnosticRequest;
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
