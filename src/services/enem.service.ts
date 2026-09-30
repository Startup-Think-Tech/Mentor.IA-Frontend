import type {
  EnemDiscipline,
  QuizAlternative,
  QuizQuestion,
} from "@/types/quiz";

const ENEM_API_URL =
  process.env.NEXT_PUBLIC_ENEM_API_URL ?? "https://api.enem.dev/v1";

type EnemApiAlternative = {
  letter: QuizAlternative["letter"];
  text: string;
  file?: string | null;
  isCorrect?: boolean;
};

type EnemApiQuestion = {
  index: number;
  year: number;
  title: string;
  discipline: EnemDiscipline;
  language?: string | null;
  context?: string;
  files?: string[];
  alternativesIntroduction?: string;
  alternatives: EnemApiAlternative[];
  correctAlternative: QuizAlternative["letter"];
};

type EnemQuestionsResponse = {
  metadata: {
    limit: number;
    offset: number;
    total: number;
    hasMore: boolean;
  };
  questions: EnemApiQuestion[];
};
export type FetchEnemQuestionsParams = {
  year: number;
  limit?: number;
  offset?: number;
  signal?: AbortSignal;
};

const subjectByDiscipline: Record<EnemDiscipline, string> = {
  matematica: "Matemática",
  linguagens: "Linguagens",
  "ciencias-humanas": "Ciências Humanas",
  "ciencias-natureza": "Ciências da Natureza",
};

function mapQuestion(question: EnemApiQuestion): QuizQuestion {
  return {
    id: String(question.year) + "-" + question.discipline + "-" + question.index,
    index: question.index,
    year: question.year,
    discipline: question.discipline,
    subject: subjectByDiscipline[question.discipline],
    topic: subjectByDiscipline[question.discipline],
    title: question.alternativesIntroduction || question.title,
    context: question.context,
    files: question.files,
    alternatives: question.alternatives.map(({ letter, text, file }) => ({
      letter,
      text,
      file,
    })),
    correctAlternative: question.correctAlternative,
  };
}
export async function fetchEnemQuestions({
  year,
  limit = 50,
  offset = 0,
  signal,
}: FetchEnemQuestionsParams): Promise<EnemQuestionsResponse> {
  const params = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  });

  const response = await fetch(
    ENEM_API_URL + "/exams/" + year + "/questions?" + params.toString(),
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      signal,
    },
  );

  if (!response.ok) {
    throw new Error(
      "Falha ao buscar questões do ENEM: HTTP " + response.status,
    );
  }

  return (await response.json()) as EnemQuestionsResponse;
}
export async function fetchInitialDiagnosticQuestions(
  year = 2023,
  signal?: AbortSignal,
): Promise<QuizQuestion[]> {
  const disciplines: EnemDiscipline[] = [
    "matematica",
    "linguagens",
    "ciencias-humanas",
    "ciencias-natureza",
  ];

  const selected = new Map<EnemDiscipline, EnemApiQuestion[]>(
    disciplines.map((discipline) => [discipline, []]),
  );

  let offset = 0;
  const limit = 50;
  let hasMore = true;

  while (hasMore) {
    const page = await fetchEnemQuestions({
      year,
      limit,
      offset,
      signal,
    });

    for (const question of page.questions) {
      const bucket = selected.get(question.discipline);

      if (bucket && bucket.length < 2) {
        bucket.push(question);
      }
    }
    const hasEnoughQuestions = disciplines.every(
      (discipline) => (selected.get(discipline)?.length ?? 0) >= 2,
    );

    if (hasEnoughQuestions) {
      break;
    }

    hasMore = page.metadata.hasMore;
    offset += limit;
  }

  const missingDiscipline = disciplines.find(
    (discipline) => (selected.get(discipline)?.length ?? 0) < 2,
  );

  if (missingDiscipline) {
    throw new Error(
      "A API não retornou 2 questões para a área: " +
        subjectByDiscipline[missingDiscipline],
    );
  }

  return disciplines.flatMap((discipline) =>
    (selected.get(discipline) ?? []).slice(0, 2).map(mapQuestion),
  );
}
