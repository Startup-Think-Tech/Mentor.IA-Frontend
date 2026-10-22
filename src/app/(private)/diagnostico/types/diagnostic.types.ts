export const diagnosticAreas = [
  "linguagens",
  "ciencias-humanas",
  "ciencias-natureza",
  "matematica",
] as const;

export type DiagnosticArea = (typeof diagnosticAreas)[number];

export type DiagnosticQuestionRef = {
  id: string;
  year: number;
  index: number;
  language: string;
  discipline: DiagnosticArea;
};

export type DiagnosticAlternative = {
  letter: string;
  text: string;
  isCorrect: boolean;
};

export type DiagnosticQuestion = {
  id: string;
  title: string;
  year: number;
  index: number;
  discipline: DiagnosticArea;
  context: string | null;
  question: string;
  correctAlternative: string;
  alternatives: DiagnosticAlternative[];
};
