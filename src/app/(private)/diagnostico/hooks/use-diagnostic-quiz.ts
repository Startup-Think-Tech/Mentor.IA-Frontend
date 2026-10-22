"use client";

import { useEffect, useRef, useState } from "react";

import { diagnosticoService } from "@/app/(private)/diagnostico/services/diagnostico.service";
import type { DiagnosticQuestion } from "@/app/(private)/diagnostico/types/diagnostic.types";
import type { DiagnosticoQuizState } from "@/app/(private)/diagnostico/types/diagnostico.types";

type StoredQuizProgress = {
  answers: Record<string, string>;
  currentIndex: number;
  isReviewing: boolean;
  questions: DiagnosticQuestion[];
};

const initialState: DiagnosticoQuizState = {
  questions: [],
  currentIndex: 0,
  answers: {},
  diagnosticoId: null,
  result: null,
  isLoading: true,
  isSubmitting: false,
  error: null,
  isComplete: false,
  isReviewing: false,
};

function storageKey(diagnosticoId: string) {
  return `diagnostic-quiz:${diagnosticoId}`;
}

function readStoredProgress(diagnosticoId: string): Partial<StoredQuizProgress> | null {
  try {
    const stored = window.sessionStorage.getItem(storageKey(diagnosticoId));
    if (!stored) return null;

    const parsed: unknown = JSON.parse(stored);
    return parsed && typeof parsed === "object"
      ? (parsed as Partial<StoredQuizProgress>)
      : null;
  } catch {
    return null;
  }
}

function isCachedQuestion(value: unknown): value is DiagnosticQuestion {
  if (!value || typeof value !== "object") return false;

  const question = value as Partial<DiagnosticQuestion>;
  return (
    typeof question.id === "string" &&
    typeof question.title === "string" &&
    typeof question.year === "number" &&
    typeof question.index === "number" &&
    typeof question.discipline === "string" &&
    (typeof question.context === "string" || question.context === null) &&
    typeof question.question === "string" &&
    Array.isArray(question.alternatives) &&
    question.alternatives.every(
      (alternative) =>
        typeof alternative.letter === "string" &&
        (typeof alternative.text === "string" || alternative.text === null) &&
        (typeof alternative.imageUrl === "string" || alternative.imageUrl === null),
    )
  );
}

function getCachedQuestions(diagnosticoId: string) {
  const questions = readStoredProgress(diagnosticoId)?.questions;
  return Array.isArray(questions) &&
    questions.length > 0 &&
    questions.every(isCachedQuestion)
    ? questions
    : null;
}

function getStoredProgress(
  diagnosticoId: string,
  questions: DiagnosticQuestion[],
): StoredQuizProgress {
  const progress = readStoredProgress(diagnosticoId);
  if (!progress) {
    return { answers: {}, currentIndex: 0, isReviewing: false, questions };
  }

  try {
    const storedAnswers = progress.answers ?? {};
    const answers = Object.fromEntries(
      questions.flatMap((question) => {
        const answer = storedAnswers[question.id];
        return typeof answer === "string" &&
          question.alternatives.some((alternative) => alternative.letter === answer)
          ? [[question.id, answer] as const]
          : [];
      }),
    );
    const isReviewing =
      progress.isReviewing === true && Object.keys(answers).length === questions.length;

    return {
      answers,
      currentIndex:
        typeof progress.currentIndex === "number"
          ? Math.min(Math.max(progress.currentIndex, 0), questions.length - 1)
          : 0,
      isReviewing,
      questions,
    };
  } catch {
    return { answers: {}, currentIndex: 0, isReviewing: false, questions };
  }
}

export function useDiagnosticQuiz() {
  const [state, setState] = useState<DiagnosticoQuizState>(initialState);
  const isSubmittingRef = useRef(false);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const diagnostico = await diagnosticoService.getOrCreateCurrent();
        const questions =
          getCachedQuestions(diagnostico.id) ??
          (await diagnosticoService.getQuestions(diagnostico.id));
        const result = questions.length === 0
          ? await diagnosticoService.finalize(diagnostico.id)
          : null;
        if (!active) return;
        const progress = result
          ? { answers: {}, currentIndex: 0, isReviewing: false, questions }
          : getStoredProgress(diagnostico.id, questions);

        setState((current) => ({
          ...current,
          diagnosticoId: diagnostico.id,
          result,
          ...progress,
          isLoading: false,
          isComplete: result !== null,
        }));
      } catch (error) {
        if (!active) return;

        setState((current) => ({
          ...current,
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "Não foi possível carregar o diagnóstico.",
        }));
      }
    }

    load();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!state.diagnosticoId) return;

    if (state.isComplete) {
      window.sessionStorage.removeItem(storageKey(state.diagnosticoId));
      return;
    }

    if (state.questions.length === 0) return;

    window.sessionStorage.setItem(
      storageKey(state.diagnosticoId),
      JSON.stringify({
        answers: state.answers,
        currentIndex: state.currentIndex,
        isReviewing: state.isReviewing,
        questions: state.questions,
      } satisfies StoredQuizProgress),
    );
  }, [
    state.answers,
    state.currentIndex,
    state.diagnosticoId,
    state.isComplete,
    state.isReviewing,
    state.questions,
  ]);

  const currentQuestion = state.questions[state.currentIndex] ?? null;
  const selectedAlternative = currentQuestion
    ? state.answers[currentQuestion.id] ?? null
    : null;

  function selectAlternative(letter: string) {
    if (!currentQuestion) return;

    setState((current) => ({
      ...current,
      answers: { ...current.answers, [currentQuestion.id]: letter },
    }));
  }

  function goToPreviousQuestion() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setState((current) => ({
      ...current,
      currentIndex: Math.max(0, current.currentIndex - 1),
      error: null,
    }));
  }

  function goToNextQuestion() {
    if (!selectedAlternative) return;

    window.scrollTo({ top: 0, behavior: "smooth" });
    setState((current) => {
      const isLastQuestion = current.currentIndex === current.questions.length - 1;

      return {
        ...current,
        currentIndex: isLastQuestion
          ? current.currentIndex
          : current.currentIndex + 1,
        isReviewing: isLastQuestion,
        error: null,
      };
    });
  }

  function goToQuestion(index: number) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setState((current) => ({
      ...current,
      currentIndex: index,
      isReviewing: false,
      error: null,
    }));
  }

  async function submitAnswers() {
    const { questions, answers, diagnosticoId } = state;

    if (
      !diagnosticoId ||
      questions.some((question) => !answers[question.id]) ||
      isSubmittingRef.current
    ) {
      return;
    }

    isSubmittingRef.current = true;
    setState((current) => ({ ...current, isSubmitting: true, error: null }));

    try {
      await diagnosticoService.registerAnswers(
        diagnosticoId,
        questions.map((question) => ({
          questionId: question.id,
          alternative: answers[question.id],
        })),
      );
      const result = await diagnosticoService.finalize(diagnosticoId);

      setState((current) => ({
        ...current,
        result,
        isComplete: true,
        isReviewing: false,
        isSubmitting: false,
      }));
    } catch (error) {
      setState((current) => ({
        ...current,
        isSubmitting: false,
        error: error instanceof Error ? error.message : "Não foi possível salvar sua resposta.",
      }));
    } finally {
      isSubmittingRef.current = false;
    }
  }

  return {
    ...state,
    currentQuestion,
    selectedAlternative,
    selectAlternative,
    goToPreviousQuestion,
    goToNextQuestion,
    goToQuestion,
    submitAnswers,
  };
}
