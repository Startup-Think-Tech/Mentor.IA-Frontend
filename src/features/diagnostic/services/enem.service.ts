import { enemQuestionSchema } from "@/features/diagnostic/schemas/enem-question.schema";
import type {
  DiagnosticQuestion,
  DiagnosticQuestionRef,
} from "@/features/diagnostic/types/diagnostic.types";

const ENEM_API_URL = "https://api.enem.dev/v1/exams";

async function fetchQuestion(
  reference: DiagnosticQuestionRef,
): Promise<DiagnosticQuestion> {
  const response = await fetch(
    `${ENEM_API_URL}/${reference.year}/questions/${reference.index}`,
  );

  if (!response.ok) {
    throw new Error("Não foi possível carregar a questão do ENEM.");
  }

  const rawQuestion = enemQuestionSchema.parse(await response.json());

  return {
    title: rawQuestion.title,
    year: rawQuestion.year,
    index: rawQuestion.index,
    subject: reference.subject,
    context: rawQuestion.context,
    question: rawQuestion.alternativesIntroduction,
    correctAlternative: rawQuestion.correctAlternative,
    alternatives: rawQuestion.alternatives
      .filter((alternative) => alternative.text)
      .map((alternative) => ({
        letter: alternative.letter,
        text: alternative.text ?? "",
        isCorrect: alternative.isCorrect,
      })),
  };
}

async function fetchQuestions(
  references: DiagnosticQuestionRef[],
): Promise<DiagnosticQuestion[]> {
  return Promise.all(references.map(fetchQuestion));
}

export const enemService = {
  fetchQuestion,
  fetchQuestions,
};
