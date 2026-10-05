export const diagnosticSubjects = [
  "portugues",
  "matematica",
  "historia",
  "biologia",
  "geografia",
] as const;

export type DiagnosticSubject = (typeof diagnosticSubjects)[number];

export type DiagnosticQuestionRef = {
  subject: DiagnosticSubject;
  year: number;
  index: number;
};

export type DiagnosticAlternative = {
  letter: string;
  text: string;
  isCorrect: boolean;
};

export type DiagnosticQuestion = {
  title: string;
  year: number;
  index: number;
  subject: DiagnosticSubject;
  context: string | null;
  question: string;
  correctAlternative: string;
  alternatives: DiagnosticAlternative[];
};
