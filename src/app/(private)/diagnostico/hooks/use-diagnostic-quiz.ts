"use client";

import { useEffect, useRef, useState } from "react";

import { diagnosticoService } from "@/app/(private)/diagnostico/services/diagnostico.service";
import type { DiagnosticoQuizState } from "@/app/(private)/diagnostico/types/diagnostico.types";

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

export function useDiagnosticQuiz() {
  const [state, setState] = useState<DiagnosticoQuizState>(initialState);
  const isSubmittingRef = useRef(false);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const diagnostico = await diagnosticoService.getOrCreateCurrent();
        const questions = await diagnosticoService.getQuestions(diagnostico.id);
        const result = questions.length === 0
          ? await diagnosticoService.finalize(diagnostico.id)
          : null;
        if (!active) return;

        setState((current) => ({
          ...current,
          questions,
          diagnosticoId: diagnostico.id,
          result,
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
    setState((current) => ({
      ...current,
      currentIndex: Math.max(0, current.currentIndex - 1),
      error: null,
    }));
  }

  function goToNextQuestion() {
    if (!selectedAlternative) return;

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
