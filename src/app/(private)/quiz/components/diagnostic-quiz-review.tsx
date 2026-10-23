import { ArrowLeft, ArrowRight, ClipboardCheck, Pencil } from "lucide-react";
import Image from "next/image";

import { diagnosticAreaLabels } from "@/app/(private)/diagnostico/constants/diagnostic-questions";
import type { DiagnosticQuestion } from "@/app/(private)/diagnostico/types/diagnostic.types";
import { Button } from "@/components/ui/button";

type DiagnosticQuizReviewProps = {
  questions: DiagnosticQuestion[];
  answers: Record<string, string>;
  error: string | null;
  isSubmitting: boolean;
  onEditQuestion: (index: number) => void;
  onBackToQuiz: () => void;
  onSubmit: () => void;
};

export function DiagnosticQuizReview({
  questions,
  answers,
  error,
  isSubmitting,
  onEditQuestion,
  onBackToQuiz,
  onSubmit,
}: DiagnosticQuizReviewProps) {
  return (
    <section className="mx-auto max-w-4xl rounded-[32px] border border-[#e3e7f1] bg-white p-6 sm:p-10">
      <header className="border-b border-[#e8ecf7] pb-7">
        <div className="flex items-center gap-3 text-mentor-blue">
          <ClipboardCheck className="size-6" />
          <span className="text-sm font-bold uppercase tracking-[0.14em]">
            Revisão final
          </span>
        </div>
        <h1 className="mt-3 text-3xl font-extrabold text-[#172052] sm:text-4xl">
          Confira suas respostas
        </h1>
        <p className="mt-3 text-[#657196]">
          Você respondeu {questions.length} questões. Se quiser, altere uma resposta antes de finalizar.
        </p>
        {error && (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}
      </header>

      <div className="mt-6 grid gap-3">
        {questions.map((question, index) => {
          const selectedAlternative = question.alternatives.find(
            (alternative) => alternative.letter === answers[question.id],
          );

          return (
            <article
              key={question.id}
              className="grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-3 overflow-hidden rounded-2xl border border-[#e3e7f1] bg-[#fbfcff] px-4 py-3 sm:gap-4 sm:px-5"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-mentor-blue-soft text-sm font-extrabold text-mentor-blue">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex min-w-0 items-center gap-2">
                  <p className="truncate text-xs font-bold uppercase tracking-[0.08em] text-[#7180af]">
                    {diagnosticAreaLabels[question.discipline]}
                  </p>
                  <span className="shrink-0 rounded-full bg-mentor-blue-soft px-2 py-0.5 text-xs font-extrabold text-mentor-blue">
                    {answers[question.id]}
                  </span>
                </div>
                <p className="mt-1 break-words text-sm font-semibold leading-6 text-[#22305b] sm:text-base">
                  {question.question}
                </p>
                {selectedAlternative?.text && (
                  <p className="mt-2 border-l-2 border-mentor-blue pl-3 text-sm leading-5 text-[#52618c]">
                    <span className="font-bold text-[#35446f]">Resposta marcada: </span>
                    {selectedAlternative.text}
                  </p>
                )}
                {selectedAlternative?.imageUrl && (
                  <div className="relative mt-2 h-20 w-32">
                    <Image
                      src={selectedAlternative.imageUrl}
                      alt={`Alternativa ${selectedAlternative.letter} marcada`}
                      fill
                      sizes="128px"
                      className="rounded-md object-contain"
                    />
                  </div>
                )}
              </div>
              <Button
                type="button"
                variant="ghost"
                onClick={() => onEditQuestion(index)}
                className="size-10 shrink-0 rounded-xl p-0 text-mentor-blue hover:bg-mentor-blue-soft hover:text-mentor-blue"
                aria-label={`Alterar resposta da questão ${index + 1}`}
              >
                <Pencil className="size-4" />
                <span className="sr-only">Alterar</span>
              </Button>
            </article>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#e8ecf7] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="button"
          variant="ghost"
          disabled={isSubmitting}
          onClick={onBackToQuiz}
          className="h-12 rounded-[24px] px-5 font-bold text-[#52618c] hover:bg-[#f1f4fb] hover:text-[#22305b]"
        >
          <ArrowLeft className="size-4" />
          Voltar ao quiz
        </Button>
        <Button
          type="button"
          disabled={isSubmitting}
          onClick={onSubmit}
          className="h-12 rounded-[24px] bg-mentor-blue px-6 text-base font-bold text-white hover:bg-mentor-blue-hover"
        >
          {isSubmitting ? "Enviando..." : "Enviar para análise"}
          {!isSubmitting && <ArrowRight className="size-4" />}
        </Button>
      </div>
    </section>
  );
}
