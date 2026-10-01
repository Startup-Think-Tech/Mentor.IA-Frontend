import type { DiagnosticQuestionRef } from "@/features/diagnostic/types/diagnostic.types";

export const diagnosticQuestionRefs: DiagnosticQuestionRef[] = [
  { subject: "portugues", year: 2023, index: 16 },
  { subject: "matematica", year: 2023, index: 150 },
  { subject: "historia", year: 2023, index: 77 },
  { subject: "biologia", year: 2023, index: 103 },
  { subject: "geografia", year: 2023, index: 53 },
];

export const diagnosticSubjectLabels = {
  portugues: "Português",
  matematica: "Matemática",
  historia: "História",
  biologia: "Biologia",
  geografia: "Geografia",
} as const;
