import type { DiagnosticSubject } from "@/features/diagnostic/types/diagnostic.types";

export const subjectTopics: Record<DiagnosticSubject, string[]> = {
  portugues: ["Interpretação de texto", "Gramática", "Variação linguística"],
  matematica: ["Funções", "Probabilidade", "Geometria plana"],
  historia: ["Brasil Colônia", "Era Vargas", "Iluminismo"],
  biologia: ["Ecologia", "Genética", "Fisiologia humana"],
  geografia: ["Urbanização", "Meio ambiente", "Geopolítica"],
};

export const subjectBadgeClasses: Record<DiagnosticSubject, string> = {
  portugues: "bg-emerald-50 text-emerald-700 border-emerald-100",
  matematica: "bg-rose-50 text-rose-700 border-rose-100",
  historia: "bg-blue-50 text-blue-700 border-blue-100",
  biologia: "bg-amber-50 text-amber-700 border-amber-100",
  geografia: "bg-violet-50 text-violet-700 border-violet-100",
};
