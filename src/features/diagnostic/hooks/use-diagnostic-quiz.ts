"use client";

import { useEffect, useState } from "react";

import { diagnosticQuestionRefs } from "@/features/diagnostic/constants/diagnostic-questions";
import type { DiagnosticResults } from "@/features/diagnostic/schemas/diagnostic-results.schema";
import { enemService } from "@/features/diagnostic/services/enem.service";
import { diagnosticStorage } from "@/features/diagnostic/storage/diagnostic.storage";
import type { DiagnosticQuestion } from "@/features/diagnostic/types/diagnostic.types";

type DiagnosticQuizState = {
  questions: DiagnosticQuestion[];
  currentIndex: number;
  selectedAlternative: string | null;
  results: DiagnosticResults;
  isLoading: boolean;
  error: string | null;
  isComplete: boolean;
};

const initialState: DiagnosticQuizState = {
  questions: [],
  currentIndex: 0,
  selectedAlternative: null,
  results: {},
  isLoading: true,
  error: null,
  isComplete: false,
};

export function useDiagnosticQuiz() {
  const [state, setState] = useState<DiagnosticQuizState>(initialState);

  useEffect(() => {
    let active = true;

    enemService
      .fetchQuestions(diagnosticQuestionRefs)
      .then((questions) => {
        if (!active) return;

        setState((current) => ({
          ...current,
          questions,
          isLoading: false,
        }));
      })
      .catch((error: unknown) => {
        if (!active) return;

        setState((current) => ({
          ...current,
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "Não foi possível carregar o diagnóstico.",
        }));
      });

    return () => {
      active = false;
    };
  }, []);

  const currentQuestion = state.questions[state.currentIndex] ?? null;

  function selectAlternative(letter: string) {
    setState((current) => ({
      ...current,
      selectedAlternative: letter,
    }));
  }

  function submitCurrentAnswer() {
    const question = state.questions[state.currentIndex];
    const selected = state.selectedAlternative;

    if (!question || !selected) {
      return;
    }

    const isCorrect = selected === question.correctAlternative;
    const results = diagnosticStorage.saveResult(
      question.subject,
      isCorrect,
    );

    const isLastQuestion = state.currentIndex === state.questions.length - 1;

    setState((current) => ({
      ...current,
      results,
      selectedAlternative: null,
      currentIndex: isLastQuestion
        ? current.currentIndex
        : current.currentIndex + 1,
      isComplete: isLastQuestion,
    }));
  }

  return {
    ...state,
    currentQuestion,
    selectAlternative,
    submitCurrentAnswer,
  };
}
