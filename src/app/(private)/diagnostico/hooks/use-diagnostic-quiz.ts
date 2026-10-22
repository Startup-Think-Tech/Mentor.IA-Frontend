"use client";

import { useEffect, useState } from "react";

import { enemService } from "@/app/(private)/diagnostico/services/enem.service";
import { diagnosticoService } from "@/app/(private)/diagnostico/services/diagnostico.service";
import type { DiagnosticoQuizState } from "@/app/(private)/diagnostico/types/diagnostico.types";

const initialState: DiagnosticoQuizState = {
  questions: [],
  currentIndex: 0,
  selectedAlternative: null,
  diagnosticoId: null,
  result: null,
  isLoading: true,
  error: null,
  isComplete: false,
};

export function useDiagnosticQuiz() {
  const [state, setState] = useState<DiagnosticoQuizState>(initialState);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const diagnostico = await diagnosticoService.getOrCreateCurrent();
        const references = await diagnosticoService.getQuestions(diagnostico.id);
        const questions = await enemService.fetchQuestions(references);
        if (!active) return;

        setState((current) => ({
          ...current,
          questions,
          diagnosticoId: diagnostico.id,
          isLoading: false,
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

    void load();

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

    if (!question || !selected || !state.diagnosticoId) {
      return;
    }

    const isCorrect = selected === question.correctAlternative;
    const isLastQuestion = state.currentIndex === state.questions.length - 1;

    try {
      await diagnosticoService.registerAnswer(
        state.diagnosticoId,
        question.id,
        selected,
        isCorrect,
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
      }));
    } catch (error) {
      setState((current) => ({
        ...current,
        error: error instanceof Error ? error.message : "Não foi possível salvar sua resposta.",
      }));
    }
  }

  return {
    ...state,
    currentQuestion,
    selectAlternative,
    submitCurrentAnswer,
  };
}
