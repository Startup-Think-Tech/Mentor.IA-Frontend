export const diagnosticAreas = [
  "linguagens",
  "ciencias-humanas",
  "ciencias-natureza",
  "matematica",
] as const;

export type DiagnosticArea = (typeof diagnosticAreas)[number];

export type DiagnosticAlternative = {
  letter: string;
  text: string | null;
  imageUrl: string | null;
};

export type DiagnosticQuestion = {
  id: string;
  title: string;
  year: number;
  index: number;
  discipline: DiagnosticArea;
  context: string | null;
  question: string;
  alternatives: DiagnosticAlternative[];
};
