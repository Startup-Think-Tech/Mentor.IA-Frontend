"use client";

import { CheckCircle2, CircleX, Loader2 } from "lucide-react";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  diagnosticSubjectLabels,
} from "@/features/diagnostic/constants/diagnostic-questions";
import { useDiagnosticQuiz } from "@/features/diagnostic/hooks/use-diagnostic-quiz";
import { diagnosticSubjects } from "@/features/diagnostic/types/diagnostic.types";
import { cn } from "@/lib/utils";

export function DiagnosticQuiz() {
  const {
    currentQuestion,
    currentIndex,
    questions,
    selectedAlternative,
    results,
    isLoading,
    error,
    isComplete,
    selectAlternative,
    submitCurrentAnswer,
  } = useDiagnosticQuiz();

  if (isLoading) {
    return (
      <main className="grid min-h-dvh place-items-center bg-[#f6f7fb]">
        <Loader2 className="size-9 animate-spin text-[#3555b6]" />
      </main>
    );
  }

  if (error || !currentQuestion) {
    return (
      <main className="grid min-h-dvh place-items-center bg-[#f6f7fb] px-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-[#22305b]">
            Não foi possível carregar o quiz
          </h1>
          <p className="mt-3 text-[#7180af]">
            {error ?? "Questão indisponível no momento."}
          </p>
        </div>
      </main>
    );
  }

  if (isComplete) {
    return (
      <main className="min-h-dvh bg-[#f6f7fb] px-6 py-12">
        <section className="mx-auto max-w-3xl rounded-[32px] bg-white p-8 shadow-sm sm:p-10">
          <h1 className="text-3xl font-extrabold text-[#22305b]">
            Diagnóstico concluído
          </h1>
          <p className="mt-3 text-[#7180af]">
            Os resultados foram salvos e já podem ser usados na análise de gaps.
          </p>

          <div className="mt-8 grid gap-3">
            {diagnosticSubjects.map((subject) => {
              const isCorrect = results[subject];

              return (
                <div
                  key={subject}
                  className="flex items-center justify-between rounded-2xl bg-[#f7f8fc] px-5 py-4"
                >
                  <span className="font-semibold text-[#22305b]">
                    {diagnosticSubjectLabels[subject]}
                  </span>

                  <span
                    className={cn(
                      "flex items-center gap-2 text-sm font-bold",
                      isCorrect ? "text-emerald-600" : "text-red-500",
                    )}
                  >
                    {isCorrect ? (
                      <CheckCircle2 className="size-5" />
                    ) : (
                      <CircleX className="size-5" />
                    )}
                    {isCorrect ? "Acertou" : "Errou"}
                  </span>
                </div>
              );
            })}
          </div>

          <Link
            href="/cronograma"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-8 h-12 rounded-[24px] bg-[#3555b6] px-6 font-bold text-white hover:bg-[#2e49a3]",
            )}
          >
            Ver meu cronograma
          </Link>
        </section>
      </main>
    );
  }

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <main className="min-h-dvh bg-[#f6f7fb] px-4 py-8 sm:px-6 lg:py-12">
      <section className="mx-auto max-w-4xl rounded-[32px] bg-white p-6 shadow-sm sm:p-10">
        <header>
          <div className="flex items-center justify-between gap-4">
            <span className="rounded-full bg-[#38c7cf] px-4 py-2 text-sm font-bold text-white">
              {currentIndex + 1} de {questions.length}
            </span>

            <span className="text-sm font-semibold text-[#3555b6]">
              {diagnosticSubjectLabels[currentQuestion.subject]}
            </span>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#e8ecf7]">
            <div
              className="h-full rounded-full bg-[#3555b6] transition-[width]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </header>

        <div className="mt-8">
          <p className="text-sm font-medium text-[#8a97bd]">
            ENEM {currentQuestion.year} · Questão {currentQuestion.index}
          </p>

          {currentQuestion.context && (
            <div className="mt-5 whitespace-pre-line rounded-2xl bg-[#f8f9fd] p-5 text-sm leading-7 text-[#485983]">
              {currentQuestion.context}
            </div>
          )}

          <h1 className="mt-6 text-xl font-bold leading-8 text-[#22305b] sm:text-2xl">
            {currentQuestion.question}
          </h1>

          <div className="mt-7 grid gap-3">
            {currentQuestion.alternatives.map((alternative) => {
              const selected = selectedAlternative === alternative.letter;

              return (
                <button
                  key={alternative.letter}
                  type="button"
                  onClick={() => selectAlternative(alternative.letter)}
                  className={cn(
                    "flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-colors",
                    selected
                      ? "border-[#3555b6] bg-[#eef2ff]"
                      : "border-[#e3e7f1] bg-white hover:bg-[#f8f9fd]",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold",
                      selected
                        ? "bg-[#3555b6] text-white"
                        : "bg-[#eef1fa] text-[#3555b6]",
                    )}
                  >
                    {alternative.letter}
                  </span>

                  <span className="pt-1 text-sm leading-6 text-[#35446f] sm:text-base">
                    {alternative.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            type="button"
            disabled={!selectedAlternative}
            onClick={submitCurrentAnswer}
            className="h-12 min-w-40 rounded-[24px] bg-[#3555b6] px-6 text-base font-bold text-white hover:bg-[#2e49a3]"
          >
            {currentIndex === questions.length - 1
              ? "Finalizar"
              : "Próxima questão"}
          </Button>
        </div>
      </section>
    </main>
  );
}
