import { diagnosticResultsSchema } from "@/features/diagnostic/schemas/diagnostic-results.schema";
import type { DiagnosticSubject } from "@/features/diagnostic/types/diagnostic.types";

const DIAGNOSTIC_RESULTS_KEY = "mentor.ia.diagnostic-results";

function getStorage() {
  if (typeof window === "undefined") return null;
  return window.localStorage;
}

function readResults() {
  const storage = getStorage();
  if (!storage) return {};

  const raw = storage.getItem(DIAGNOSTIC_RESULTS_KEY);
  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw) as unknown;
    const result = diagnosticResultsSchema.safeParse(parsed);

    return result.success ? result.data : {};
  } catch {
    storage.removeItem(DIAGNOSTIC_RESULTS_KEY);
    return {};
  }
}
export const diagnosticStorage = {
  getResults() {
    return readResults();
  },

  saveResult(subject: DiagnosticSubject, isCorrect: boolean) {
    const nextResults = diagnosticResultsSchema.parse({
      ...readResults(),
      [subject]: isCorrect,
    });

    getStorage()?.setItem(
      DIAGNOSTIC_RESULTS_KEY,
      JSON.stringify(nextResults),
    );

    return nextResults;
  },

  clear() {
    getStorage()?.removeItem(DIAGNOSTIC_RESULTS_KEY);
  },
};
