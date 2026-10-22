import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

import { diagnosticAreaLabels } from "@/app/(private)/diagnostico/constants/diagnostic-questions";
import type { DiagnosticQuestion } from "@/app/(private)/diagnostico/types/diagnostic.types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { QuestionContext } from "./question-context";

type DiagnosticQuizQuestionProps = {
  question: DiagnosticQuestion;
  currentIndex: number;
  totalQuestions: number;
  selectedAlternative: string | null;
  isSubmitting: boolean;
  onSelectAlternative: (letter: string) => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function DiagnosticQuizQuestion({
  question,
  currentIndex,
  totalQuestions,
  selectedAlternative,
  isSubmitting,
  onSelectAlternative,
  onPrevious,
  onNext,
}: DiagnosticQuizQuestionProps) {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  return (
    <section className="mx-auto max-w-4xl rounded-[32px] border border-[#e3e7f1] bg-white p-6 sm:p-10">
      <header>
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-full bg-[#38c7cf] px-4 py-2 text-sm font-bold text-white">
            {currentIndex + 1} de {totalQuestions}
          </span>

          <span className="text-sm font-semibold text-mentor-blue">
            {diagnosticAreaLabels[question.discipline]}
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
          ENEM {question.year} · Questão {question.index}
        </p>

        {question.context && <QuestionContext content={question.context} />}

        <h1 className="mt-8 text-2xl font-extrabold leading-9 text-[#172052] sm:text-3xl sm:leading-10">
          {question.question}
        </h1>

        <div className="mt-7 grid gap-3">
          {question.alternatives.map((alternative) => {
            const selected = selectedAlternative === alternative.letter;

            return (
              <button
                key={alternative.letter}
                type="button"
                disabled={isSubmitting}
                onClick={() => onSelectAlternative(alternative.letter)}
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

      <div className="mt-8 flex items-center justify-between gap-4">
        <Button
          type="button"
          variant="ghost"
          disabled={currentIndex === 0 || isSubmitting}
          onClick={onPrevious}
          className="h-12 rounded-[24px] px-5 font-bold text-[#52618c] hover:bg-[#f1f4fb] hover:text-[#22305b]"
        >
          <ArrowLeft className="size-4" />
          Anterior
        </Button>
        <Button
          type="button"
          disabled={!selectedAlternative || isSubmitting}
          onClick={onNext}
          className="h-12 min-w-40 rounded-[24px] bg-mentor-blue px-6 text-base font-bold text-white hover:bg-mentor-blue-hover"
        >
          {isLastQuestion ? "Revisar respostas" : "Próxima questão"}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  );
}
