"use client";

import { CheckCircle2, CircleX, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  diagnosticAreaLabels,
} from "@/app/(private)/diagnostico/constants/diagnostic-questions";
import { useDiagnosticQuiz } from "@/app/(private)/diagnostico/hooks/use-diagnostic-quiz";
import { cn } from "@/lib/utils";
import { QuestionContext } from "./question-context";

export function DiagnosticQuiz() {
  const {
    currentQuestion,
    currentIndex,
    questions,
    selectedAlternative,
    result,
    isLoading,
    isSubmitting,
    error,
    isComplete,
    selectAlternative,
    submitCurrentAnswer,
  } = useDiagnosticQuiz();

  if (isLoading) {
    return (
      <main className="grid min-h-dvh place-items-center bg-[#f6f7fb]">
        <Loader2 className="size-9 animate-spin text-mentor-blue" />
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
            {result?.desempenhos.map((performance) => {
              return (
                <div
                  key={performance.disciplina.id}
                  className="flex items-center justify-between rounded-2xl bg-[#f7f8fc] px-5 py-4"
                >
                  <span className="font-semibold text-[#22305b]">
                    {performance.disciplina.nome}
                  </span>

                  <span
                    className={cn(
                      "flex items-center gap-2 text-sm font-bold",
                       performance.percentual >= 50 ? "text-emerald-600" : "text-red-500",
                    )}
                  >
                    {performance.percentual >= 50 ? (
                      <CheckCircle2 className="size-5" />
                    ) : (
                      <CircleX className="size-5" />
                    )}
                    {performance.percentual}% · {performance.acertos} de {performance.totalQuestoes}
                  </span>
                </div>
              );
            })}
          </div>

          <Link
            href="/cronograma"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-8 h-12 rounded-[24px] bg-mentor-blue px-6 font-bold text-white hover:bg-mentor-blue-hover",
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
    <main className="min-h-dvh bg-white px-4 py-8 sm:px-6 lg:py-12">
      <section className="mx-auto max-w-4xl rounded-[32px] border border-[#e3e7f1] bg-white p-6 sm:p-10">
        <header>
          <div className="flex items-center justify-between gap-4">
            <span className="rounded-full bg-[#38c7cf] px-4 py-2 text-sm font-bold text-white">
              {currentIndex + 1} de {questions.length}
            </span>

            <span className="text-sm font-semibold text-mentor-blue">
              {diagnosticAreaLabels[currentQuestion.discipline]}
            </span>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#e8ecf7]">
            <div
              className="h-full rounded-full bg-mentor-blue transition-[width]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </header>

        <div className="mt-8">
          <p className="text-base font-semibold text-[#7180af]">
            ENEM {currentQuestion.year} · Questão {currentQuestion.index}
          </p>

          {currentQuestion.context && (
            <QuestionContext content={currentQuestion.context} />
          )}

          <h1 className="mt-8 text-2xl font-extrabold leading-9 text-[#172052] sm:text-3xl sm:leading-10">
            {currentQuestion.question}
          </h1>

          <div className="mt-7 grid gap-3">
            {currentQuestion.alternatives.map((alternative) => {
              const selected = selectedAlternative === alternative.letter;

              return (
                <button
                  key={alternative.letter}
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => selectAlternative(alternative.letter)}
                  className={cn(
                    "flex w-full cursor-pointer items-start gap-4 rounded-2xl border p-5 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-60",
                    selected
                      ? "border-mentor-blue bg-mentor-blue-soft"
                      : "border-[#e3e7f1] bg-white hover:bg-[#f8f9fd]",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-full text-base font-bold",
                      selected
                        ? "bg-mentor-blue text-white"
                        : "bg-[#eef1fa] text-mentor-blue",
                    )}
                  >
                    {alternative.letter}
                  </span>

                  <div className="min-w-0 flex-1">
                    {alternative.text && (
                      <span className="block pt-0.5 text-base leading-7 text-[#263a70] sm:text-lg sm:leading-8">
                        {alternative.text}
                      </span>
                    )}
                    {alternative.imageUrl && (
                      <div className="relative h-52 w-full">
                        <Image
                          src={alternative.imageUrl}
                          alt={`Alternativa ${alternative.letter}`}
                          fill
                          sizes="(max-width: 640px) 100vw, 700px"
                          className="rounded-lg object-contain"
                        />
                      </div>
                    )}
                    {!alternative.text && !alternative.imageUrl && (
                      <span className="block pt-0.5 text-sm leading-6 text-[#657196]">
                        Conteúdo visual indisponível no acervo do ENEM.
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            type="button"
            disabled={!selectedAlternative || isSubmitting}
            onClick={() => {
              submitCurrentAnswer();
            }}
            className="h-12 min-w-40 rounded-[24px] bg-mentor-blue px-6 text-base font-bold text-white hover:bg-mentor-blue-hover"
          >
            {isSubmitting
              ? "Enviando..."
              : currentIndex === questions.length - 1
              ? "Finalizar"
              : "Próxima questão"}
          </Button>
        </div>
      </section>
    </main>
  );
}
