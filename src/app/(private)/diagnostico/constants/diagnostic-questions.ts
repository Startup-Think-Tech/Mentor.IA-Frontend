import type { DiagnosticArea } from "@/app/(private)/diagnostico/types/diagnostic.types";

export const diagnosticAreaLabels: Record<DiagnosticArea, string> = {
  linguagens: "Linguagens",
  "ciencias-humanas": "Ciências Humanas",
  "ciencias-natureza": "Ciências da Natureza",
  matematica: "Matemática",
} as const;
