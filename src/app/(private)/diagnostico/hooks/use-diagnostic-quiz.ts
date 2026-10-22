"use client";

import { useEffect, useRef, useState } from "react";

import { diagnosticoService } from "@/app/(private)/diagnostico/services/diagnostico.service";
import type { DiagnosticoQuizState } from "@/app/(private)/diagnostico/types/diagnostico.types";

const initialState: DiagnosticoQuizState = {
  questions: [],
  currentIndex: 0,
  selectedAlternative: null,
  diagnosticoId: null,
  result: null,
  isLoading: true,
  isSubmitting: false,
  error: null,
  isComplete: false,
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

  function selectAlternative(letter: string) {
    setState((current) => ({
      ...current,
      selectedAlternative: letter,
    }));
  }

  async function submitCurrentAnswer() {
    const question = state.questions[state.currentIndex];
    const selected = state.selectedAlternative;

    if (
      !question ||
      !selected ||
      !state.diagnosticoId ||
      isSubmittingRef.current
    ) {
      return;
    }

    isSubmittingRef.current = true;
    setState((current) => ({ ...current, isSubmitting: true, error: null }));
    const isLastQuestion = state.currentIndex === state.questions.length - 1;

    try {
      await diagnosticoService.registerAnswer(
        state.diagnosticoId,
        question.id,
        selected,
      );
      const result = isLastQuestion
        ? await diagnosticoService.finalize(state.diagnosticoId)
        : null;

      setState((current) => ({
        ...current,
        result,
        selectedAlternative: null,
        currentIndex: isLastQuestion ? current.currentIndex : current.currentIndex + 1,
        isComplete: isLastQuestion,
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
    selectAlternative,
    submitCurrentAnswer,
  };
}
