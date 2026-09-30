export type EnemDiscipline =
  | "matematica"
  | "linguagens"
  | "ciencias-humanas"
  | "ciencias-natureza";

export type QuizAlternative = {
  letter: "A" | "B" | "C" | "D" | "E";
  text: string;
  file?: string | null;
};

export type QuizQuestion = {
  id: string;
  index: number;
  year: number;
  discipline: EnemDiscipline;
  subject: string;
  topic: string;
  title: string;
  context?: string;
  files?: string[];
  alternatives: QuizAlternative[];
  correctAlternative: QuizAlternative["letter"];
};
